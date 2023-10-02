import { addMinutes, isValid } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { computed, toValue } from 'vue';
import type { Domicile, DutyLimitOptions } from '~/sched-committee-types';

// Domestic duty limits in format [scheduled, operational, far]
const DAY_DUTY_LIMITS = [13 * 60, 14.5 * 60, 16 * 60];
const DAY_DUTY_LIMITS_WITH_SHOWTIME_BETWEEN_0500_0530 = [13 * 60, 13.5 * 60, 16 * 60]; // if a pilot's showtime is 0500-0530, then the operational duty limit is 13:30.
const DAY_DUTY_LIMITS_WITH_SHOWTIME_BETWEEN_0530_0630 = [13 * 60, 14 * 60, 16 * 60]; // If a pilot's showtime is 0531-0600, operational limits are 14:00
const DAY_DUTY_LIMITS_WITH_OPTIONAL = [13.5 * 60, 15 * 60, 16 * 60]; // TODO: Understand this: If a day or night duty period comprised of 2 trips exceeds scheduled on duty limitations, then the duty period shall be limted to a max of 13:30 Day/13:00 night
const NIGHT_DUTY_LIMITS = [11.5 * 60, 13 * 60, 16 * 60];
const NIGHT_DUTY_LIMITS_WTIH_OPTIONAL = [13 * 60, 14.5 * 60, 16 * 60];// TODO: Understand this: If a day or night duty period comprised of 2 trips exceeds scheduled on duty limitations, then the duty period shall be limted to a max of 13:30 Day/13:00 night
const CRITICAL_DUTY_LIMITS = [9 * 60, 10.5 * 60, 16 * 60];
const CRITICAL_DUTY_LIMITS_WITH_OPTIONAL = [9 * 60, 10.5 * 60, 16 * 60];

const timeZonesLBT = {
  MEM: 'America/Chicago',
  IND: 'America/Chicago',
  OAK: 'America/Los_Angeles',
  LAX: 'America/Los_Angeles',
  ANC: 'America/Anchorage',
  CGN: 'Europe/Berlin',
} as const;

export function useDutyLimits (dutyStartTimeZulu: Ref<Date>, domicile: Ref<Domicile>, options?: DutyLimitOptions) {
  /**
   * returns [scheduledDutyLimit, operationalDutyLimit, farDutyLimit?]: [number, number, number?] - in minutes
   */

  const dutyStartTimeZuluValue = toValue(dutyStartTimeZulu);
  const domicileValue = toValue(domicile);

  const dutyLimits = computed(() => {
    console.log({ dutyStartTimeZuluValue });
    if (!dutyStartTimeZuluValue || !domicileValue) { return undefined; }
    if (!isValid(dutyStartTimeZuluValue)) { return undefined; }

    const calculatedDomesticDutyLimits = calculateDomesticDutyLimit(dutyStartTimeZuluValue, domicile, options);

    if (!options?.isInternational && calculatedDomesticDutyLimits !== undefined) {
      const [scheduledDutyLimit, operationalDutyLimit, farDutyLimit] = calculatedDomesticDutyLimits;
      return { scheduledDutyLimit, operationalDutyLimit, farDutyLimit };
    }

    return undefined;
  });

  const endOfScheduledDutyTime = computed(() => (dutyLimits.value) ? calculateEndOfDutyTime(dutyStartTimeZuluValue, dutyLimits.value.scheduledDutyLimit) : undefined);
  const endOfOperationalDutyTime = computed(() => (dutyLimits.value) ? calculateEndOfDutyTime(dutyStartTimeZuluValue, dutyLimits.value.operationalDutyLimit) : undefined);
  const endOfFARDutyTime = computed(() => (dutyLimits.value) ? calculateEndOfDutyTime(dutyStartTimeZuluValue, dutyLimits.value.farDutyLimit) : undefined);
  /**
   *
   * returns [scheduledDutyLimit, operationalDutyLimit, farDutyLimit]: [number, number, number] - in minutes
   */
  function calculateDomesticDutyLimit (dutyStartTime: Date, domicile: Domicile, options?: DutyLimitOptions) {
    // get local time of duty start time based on domicile using timeZonesLBT using date-fns
    const localDutyStartTime = getLBTInHHMM(dutyStartTime, domicile); // returns in format 0500, 0530, 0600, etc.

    if (options?.isInternational) { return undefined; }

    if (localDutyStartTime < 1559) {
      if (localDutyStartTime > 600) { return !options?.is2TripsWithOneOptional ? DAY_DUTY_LIMITS : DAY_DUTY_LIMITS_WITH_OPTIONAL; }
      if (localDutyStartTime > 530) { return !options?.is2TripsWithOneOptional ? DAY_DUTY_LIMITS_WITH_SHOWTIME_BETWEEN_0530_0630 : DAY_DUTY_LIMITS_WITH_OPTIONAL; }
      if (localDutyStartTime > 500) { return !options?.is2TripsWithOneOptional ? DAY_DUTY_LIMITS_WITH_SHOWTIME_BETWEEN_0500_0530 : DAY_DUTY_LIMITS_WITH_OPTIONAL; }
    }
    if (localDutyStartTime > 1600 || localDutyStartTime < 100) { return !options?.is2TripsWithOneOptional ? NIGHT_DUTY_LIMITS : NIGHT_DUTY_LIMITS_WTIH_OPTIONAL; }
    return !options?.is2TripsWithOneOptional ? CRITICAL_DUTY_LIMITS : CRITICAL_DUTY_LIMITS_WITH_OPTIONAL;
  }

  function calculateEndOfDutyTime (dutyStartTimeZuluValue: Date, dutyLimitMinutes: number) {
    return dutyLimitMinutes ? addMinutes(new Date(dutyStartTimeZuluValue), dutyLimitMinutes) : undefined;
  }

  function getLBTInHHMM (dutyStartTimeZuluValue: Date, domicile: Domicile) {
    return Number.parseInt(formatInTimeZone(dutyStartTimeZuluValue, timeZonesLBT[domicile], 'HHmm'));
  }

  const dutyStartTimeLBT = computed(() => getLBTInHHMM(dutyStartTimeZuluValue, domicile));

  return { dutyLimits, endOfScheduledDutyTime, endOfOperationalDutyTime, endOfFARDutyTime, dutyStartTimeLBT };
}
