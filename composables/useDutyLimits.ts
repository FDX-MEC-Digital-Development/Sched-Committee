import { addMinutes, isValid } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { computed, toRef, toValue } from 'vue';
// import { DomesticDutyLimit } from '../sched-committee-types';
import { DomesticDutyLimit } from '../sched-committee-types';
import type { Domicile, DutyLimitOptions } from '~/sched-committee-types';

// Domestic duty limits in format [scheduled, operational, far]
const DOMESTIC_DAY_DUTY_LIMITS = [13 * 60, 14.5 * 60, 16 * 60];
const DOMESTIC_DAY_DUTY_LIMITS_WITH_SHOWTIME_BETWEEN_0500_0530 = [13 * 60, 13.5 * 60, 16 * 60]; // if a pilot's showtime is 0500-0530, then the operational duty limit is 13:30.
const DOMESTIC_DAY_DUTY_LIMITS_WITH_SHOWTIME_BETWEEN_0530_0630 = [13 * 60, 14 * 60, 16 * 60]; // If a pilot's showtime is 0531-0600, operational limits are 14:00
const DOMESTIC_DAY_DUTY_LIMITS_WITH_OPTIONAL = [13.5 * 60, 15 * 60, 16 * 60]; // TODO: Understand this: If a day or night duty period comprised of 2 trips exceeds scheduled on duty limitations, then the duty period shall be limted to a max of 13:30 Day/13:00 night
const DOMESTIC_NIGHT_DUTY_LIMITS = [11.5 * 60, 13 * 60, 16 * 60];
const DOMESTIC_NIGHT_DUTY_LIMITS_WTIH_OPTIONAL = [13 * 60, 14.5 * 60, 16 * 60];// TODO: Understand this: If a day or night duty period comprised of 2 trips exceeds scheduled on duty limitations, then the duty period shall be limted to a max of 13:30 Day/13:00 night
const DOMESTIC_CRITICAL_DUTY_LIMITS = [9 * 60, 10.5 * 60, 16 * 60];
const DOMESTIC_CRITICAL_DUTY_LIMITS_WITH_OPTIONAL = [9 * 60, 10.5 * 60, 16 * 60];

export const INTERNATIONAL_GRID_DUTY_LIMITS = {
  TZZof5OrMore: {
    twoPilots: {
      reset: [{
        scheduledDuty: 13.5 * 60,
        landings: 3,

      }, {
        scheduledDuty: 12 * 60,
        landings: 4,
      }],
      adjusted: [{
        scheduledDuty: 10 * 60,
        landings: 2,
      }],
      notAdjusted: [{
        scheduledDuty: 8.5 * 60,
        landings: 2,
      }],
      blockHours: 8,

    },

    threePilots: {
      reset: [{
        scheduledDuty: 13.5 * 60,
        landings: 2,
      }],
      adjusted: [{
        scheduledDuty: 12.5 * 60,
        landings: 2,
      }],
      notAdjusted: [{
        scheduledDuty: 10 * 60,
        landings: 2,
      }],
      blockHours: 12,

    },
    fourPilots: {
      reset: [{
        scheduledDuty: 18 * 60,
        landings: 2,
        note: 'This international grid landing limit may be increased by 1 for the accommodation of a scheduled \'tech stop\' or where otherwise authorized by VP, SCP, or Dir Ops.',
      }],
      adjusted: [{
        scheduledDuty: 16 * 60,
        landings: 2,
      }],
      notAdjusted: [{
        scheduledDuty: 16 * 60,
        landings: 2,
      }],
      blockHours: 16,

    },

  },
};

const timeZonesLBT = {
  MEM: 'America/Chicago',
  IND: 'America/Chicago',
  OAK: 'America/Los_Angeles',
  LAX: 'America/Los_Angeles',
  ANC: 'America/Anchorage',
  CGN: 'Europe/Berlin',
} as const;

export function useDutyLimits (dutyStartTimeZulu: MaybeRef<Date>, options?: MaybeRef<DutyLimitOptions>) {
  /**
   * returns [scheduledDutyLimit, operationalDutyLimit, farDutyLimit?]: [number, number, number?] - in minutes
   */

  const dutyStartTimeZuluRef = isValid(toValue(dutyStartTimeZulu)) ? toRef(dutyStartTimeZulu) : toRef(new Date());
  const optionsRef = toRef(options);
  const domicile = computed(() => optionsRef?.value?.domicile ? optionsRef?.value?.domicile : 'MEM');

  /* const dutyLimits = computed(() => {
    if (!dutyStartTimeZuluRef.value || !domicileRef.value) { return undefined; }
    if (!isValid(dutyStartTimeZuluRef.value)) { return undefined; }

    const calculatedDomesticDutyLimits = calculateDomesticDutyLimit(dutyStartTimeZuluRef.value, domicileRef.value, optionsRef.value);

    if (!optionsRef.value?.isInternational && calculatedDomesticDutyLimits !== undefined) {
      const [scheduledDutyLimit, operationalDutyLimit, farDutyLimit] = calculatedDomesticDutyLimits;
      return { scheduledDutyLimit, operationalDutyLimit, farDutyLimit };
    }

    return undefined;
  }); */

  // const scheduledDutyLimit = computed(() => (dutyLimits.value) ? dutyLimits.value.scheduledDutyLimit : 0);
  // const operationalDutyLimit = computed(() => (dutyLimits.value) ? dutyLimits.value.operationalDutyLimit : 0);
  // const farDutyLimit = computed(() => (dutyLimits.value) ? dutyLimits.value.farDutyLimit : 0);
  // const endOfScheduledDutyTime = computed(() => (dutyLimits.value) ? calculateEndOfDutyTime(dutyStartTimeZuluRef.value, dutyLimits.value.scheduledDutyLimit) : undefined);
  // const endOfOperationalDutyTime = computed(() => (dutyLimits.value) ? calculateEndOfDutyTime(dutyStartTimeZuluRef.value, dutyLimits.value.operationalDutyLimit) : undefined);
  // const endOfFARDutyTime = computed(() => (dutyLimits.value) ? calculateEndOfDutyTime(dutyStartTimeZuluRef.value, dutyLimits.value.farDutyLimit) : undefined);
  //
  const domestic = computed<DomesticDutyLimit>(() => {
    const [scheduled, operational, far] = calculateDomesticDutyLimit(dutyStartTimeZuluRef.value, domicile.value, optionsRef.value);
    const endOfScheduledDutyDate = calculateEndOfDutyTime(dutyStartTimeZuluRef.value, scheduled);
    const endOfOperationalDutyDate = calculateEndOfDutyTime(dutyStartTimeZuluRef.value, operational);
    const endOfFARDutyDate = calculateEndOfDutyTime(dutyStartTimeZuluRef.value, far);
    return { scheduled, operational, far, endOfScheduledDutyDate, endOfOperationalDutyDate, endOfFARDutyDate };
  });
  /**
   *
   * returns [scheduledDutyLimit, operationalDutyLimit, farDutyLimit]: [number, number, number] - in minutes
   */
  function calculateDomesticDutyLimit (dutyStartTime: Date, dom: Domicile, options?: DutyLimitOptions) {
    // get local time of duty start time based on domicile using timeZonesLBT using date-fns
    const localDutyStartTime = getLBTInHHMM(dutyStartTime, dom); // returns in format 0500, 0530, 0600, etc.

    if (!options?.isDayRoomScheduledAndReserved) {
      const blendedDutyLimits = calculateBlendedDutyLimit(localDutyStartTime, options);
      if (blendedDutyLimits) { return blendedDutyLimits; }
    }

    // non-blended
    if (localDutyStartTime < 1559) {
      if (localDutyStartTime > 600) { return !options?.is2TripsWithOneOptional ? DOMESTIC_DAY_DUTY_LIMITS : DOMESTIC_DAY_DUTY_LIMITS_WITH_OPTIONAL; }
      if (localDutyStartTime > 530) { return !options?.is2TripsWithOneOptional ? DOMESTIC_DAY_DUTY_LIMITS_WITH_SHOWTIME_BETWEEN_0530_0630 : DOMESTIC_DAY_DUTY_LIMITS_WITH_OPTIONAL; }
      if (localDutyStartTime > 500) { return !options?.is2TripsWithOneOptional ? DOMESTIC_DAY_DUTY_LIMITS_WITH_SHOWTIME_BETWEEN_0500_0530 : DOMESTIC_DAY_DUTY_LIMITS_WITH_OPTIONAL; }
    }
    if (localDutyStartTime > 1600 || localDutyStartTime < 100) { return !options?.is2TripsWithOneOptional ? DOMESTIC_NIGHT_DUTY_LIMITS : DOMESTIC_NIGHT_DUTY_LIMITS_WTIH_OPTIONAL; }
    return !options?.is2TripsWithOneOptional ? DOMESTIC_CRITICAL_DUTY_LIMITS : DOMESTIC_CRITICAL_DUTY_LIMITS_WITH_OPTIONAL;
  }

  function calculateBlendedDutyLimit (localDutyStartTime: number, options?: DutyLimitOptions) {
    // blended scheduled duty limit
    if (localDutyStartTime < 1645 && localDutyStartTime > 1545) {
      const slopeAdjustment = calculateMinuteDifference(1645, localDutyStartTime);
      const [startingScheduledDutyLimit, operationalDutyLimit, farDutyLimit] = !options?.is2TripsWithOneOptional ? DOMESTIC_DAY_DUTY_LIMITS : DOMESTIC_DAY_DUTY_LIMITS_WITH_OPTIONAL;
      const blendedScheduledDutyLimit = startingScheduledDutyLimit - slopeAdjustment; // from 13 hours to 11:30 hours
      return [blendedScheduledDutyLimit, operationalDutyLimit, farDutyLimit];
    } else if ((localDutyStartTime < 100 || localDutyStartTime > 2230)) {
      const adjustedStartTimeForDayTransition = localDutyStartTime < 100 ? localDutyStartTime + 2400 : localDutyStartTime; // adjust for day transition
      const slopeAdjustment = calculateMinuteDifference(adjustedStartTimeForDayTransition, 2230);
      const [startingScheduledDutyLimit, operationalDutyLimit, farDutyLimit] = !options?.is2TripsWithOneOptional ? DOMESTIC_NIGHT_DUTY_LIMITS : DOMESTIC_NIGHT_DUTY_LIMITS_WTIH_OPTIONAL;
      const blendedScheduledDutyLimit = startingScheduledDutyLimit - slopeAdjustment; // from 11:30 hours to 9 hours
      return [blendedScheduledDutyLimit, operationalDutyLimit, farDutyLimit];
    } else if (localDutyStartTime < 530 && localDutyStartTime > 500) {
      const slopeAdjustment = calculateMinuteDifference(530, localDutyStartTime) * 4; // 30 minutes is 2 hours
      const [startingScheduledDutyLimit, operationalDutyLimit, farDutyLimit] = !options?.is2TripsWithOneOptional ? DOMESTIC_DAY_DUTY_LIMITS_WITH_SHOWTIME_BETWEEN_0500_0530 : DOMESTIC_DAY_DUTY_LIMITS_WITH_OPTIONAL;
      const blendedScheduledDutyLimit = startingScheduledDutyLimit - 2 * 60 + slopeAdjustment; // from 11 hours to 13 hours
      return [blendedScheduledDutyLimit, operationalDutyLimit, farDutyLimit];
    }

    function calculateMinuteDifference (HHMM1: number, HHMM2: number) {
      const HH1 = Math.floor(HHMM1 / 100);
      const HH2 = Math.floor(HHMM2 / 100);
      const MM1 = HHMM1 % 100;
      const MM2 = HHMM2 % 100;
      return (HH1 - HH2) * 60 + MM1 - MM2;
    }

    return false;
  }

  /**
   * Calculates the end of duty time based on the duty start time and duty limit in minutes.
   * @param {Date} dutyStartTime - The duty start time.
   * @param {number} dutyLimitMinutes - The duty limit in minutes.
   * @returns {Date} - The end of duty time
   */
  function calculateEndOfDutyTime (dutyStartTime: Date, dutyLimitMinutes: number) {
    return addMinutes(new Date(dutyStartTime), dutyLimitMinutes);
  }

  /**
   * Returns the local base time in format HHMM based on the domicile.
   * @param {Date} startTime - startTime in Zulu
   * @param {Domicile} dom - domicile
   * @returns {number} - The local base time in format HHMM. For example, 0500, 0530, 0600, etc.
   */
  function getLBTInHHMM (startTime: Date, dom: Domicile) {
    return Number.parseInt(formatInTimeZone(startTime, timeZonesLBT[dom], 'HHmm'));
  }

  const dutyStartTimeLBT = computed(() => getLBTInHHMM(dutyStartTimeZuluRef.value, domicile.value));

  return { domestic, dutyStartTimeLBT };
}
