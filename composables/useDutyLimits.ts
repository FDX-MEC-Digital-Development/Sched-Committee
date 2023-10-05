import { addMinutes, isValid } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { computed, toRef, toValue } from 'vue';
// import { DomesticDutyLimit } from '../sched-committee-types';
import { DomesticDutyLimit, InternationalDuty } from '../sched-committee-types';
import type { Domicile, DutyLimitOptions, InternationalDutyLimit } from '~/sched-committee-types';

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
  TZDof5OrMore: {
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
      blockHours: { scheduled: 8 },

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
      blockHours: { scheduled: 12 },

    },
    fourPilots: {
      reset: [{
        scheduledDuty: 18 * 60,
        landings: 2,
        notes: 'This international grid landing limit may be increased by 1 for the accommodation of a scheduled \'tech stop\' or where otherwise authorized by VP, SCP, or Dir Ops.',
      }],
      adjusted: [{
        scheduledDuty: 16 * 60,
        landings: 2,
      }],
      notAdjusted: [{
        scheduledDuty: 16 * 60,
        landings: 2,
      }],
      blockHours: { scheduled: 16 },

    },

  },
  TZDof5OrLess: {
    twoPilots: {
      reset: [{
        scheduledDuty: 13.5 * 60,
        landings: 3,
      }, {
        scheduledDuty: 12 * 60,
        landings: 4,
      }],
      adjusted: [{
        scheduledDuty: 13.5 * 60,
        landings: 3,
      },
      {
        scheduledDuty: 12 * 60,
        landings: 4,
      }],
      notAdjusted: [{
        scheduledDuty: 12 * 60,
        landings: 4,
      }],
      blockHours: { scheduled: 8 },

    },

    threePilots: {
      reset: [{
        scheduledDuty: 13.5 * 60,
        landings: 2,
      }],
      adjusted: [{
        scheduledDuty: 13.5 * 60,
        landings: 2,
      }],
      notAdjusted: [{
        scheduledDuty: 10 * 60,
        landings: 2,
      }],
      blockHours: { scheduled: 12 },

    },
    fourPilots: {
      reset: [{
        scheduledDuty: 18 * 60,
        landings: 1,
        note: 'This international grid landing limit may be increased by 1 for the accommodation of a scheduled \'tech stop\' or where otherwise authorized by VP, SCP, or Dir Ops.',
      }],
      adjusted: [{
        scheduledDuty: 18 * 60,
        landings: 2,
      }],
      notAdjusted: [{
        scheduledDuty: 16 * 60,
        landings: 1,
      }],
      blockHours: { scheduled: 16 },

    },

  },

};

const INTERNATIONAL_NON_GRID_DUTY_LIMITS = {
  twoPilots: {
    scheduledDuty: 13.5 * 60,
    scheduledNotes: '16 hours if duty period is deadhead only, or 22 hours for deadhead only if non-stop',
    blockHours: {
      scheduled: 'Not to exceed 8 scheduled block hours in 24 hours (except 12.D.3.a and 12.D.4.a references to 12.C.2.a-c)',
      operational: 'May exceed 8-in-24 due to ATC, winds, or other unavoidable circumstances to continue to base or destination. Must receive legal rest prior to next block out.',
    },

    operationalDuty: 15 * 60,
    operationalNotes: '16 hours for extenuating circumstances, or 17:30 for deadhead only',
  },
  threePilots: {
    scheduledDuty: 13.5 * 60,
    scheduledNotes: '16 hours if duty period is deadhead only, or 22 hours for deadhead only if non-stop',
    blockHours: {
      scheduled: 'Not to exceed 12 scheduled block hours in 24 hours; or, 12:30 scheduled block hours with 1 intermediate landing; or, 10 scheduled block hours in 24 hours with 2 or more intermediate landings',
      operational: 'May exceed 12-in-24 due to ATC, winds, or other unavoidable circumstances to continue to base or destination. Must receive legal rest prior to next block out.',
    },
    operationalDuty: 15 * 60,
    operationalNotes: '16:30 hours for extenuating circumstances, or 17:30 for deadhead only',

  },
  fourPilots: {
    scheduledDuty: 18 * 60,
    scheduledNotes: '22 hours for deadhead only if non-stop',
    blockHours: { scheduled: 'Not to exceed 16 scheduled block hours in 24 hours' },
    operationalDuty: 19.5 * 60,
    operationalNotes: 'May not exceed 16-in-24',
  },
  ulr: {
    scheduledDuty: 20 * 60,
    blockHours: { scheduled: 'Not to exceed 18 scheduled block hours in 24 hours' },
    operationalDuty: 21.5 * 60,
    operationalNotes: 'May not exceed 18-in-24',
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
    const [endOfScheduledDutyDate, endOfOperationalDutyDate, endOfFARDutyDate] = [scheduled, operational, far].map(dutyLimit => calculateEndOfDutyTime(dutyStartTimeZuluRef.value, dutyLimit));

    return { scheduled, operational, far, endOfScheduledDutyDate, endOfOperationalDutyDate, endOfFARDutyDate };
  });

  const international = computed<InternationalDuty[]>(() => {
    const defaultOptions = {
      isInboundFlightSegmentGreaterThan5HoursTZD: false,
      crewNumberOfPilots: 2,
      layoverLength: 8,
    };
    const internationalOptions = optionsRef.value ? { ...defaultOptions, ...optionsRef.value } : defaultOptions;

    const dutyLimits = calculateInternationalDutyLimit(internationalOptions);

    const results = dutyLimits.map((dutyLimit) => {
      const endOfScheduledDutyDate = calculateEndOfDutyTime(dutyStartTimeZuluRef.value, dutyLimit.scheduled);
      const endOfOperationalDutyDate = dutyLimit.operational !== undefined ? calculateEndOfDutyTime(dutyStartTimeZuluRef.value, dutyLimit.operational) : undefined;
      return { scheduled: dutyLimit.scheduled, operational: dutyLimit?.operational, landings: dutyLimit.landings, blockHours: dutyLimit.blockHours, endOfScheduledDutyDate, endOfOperationalDutyDate };
    },
    );

    return results;
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

  function calculateInternationalDutyLimit (options: DutyLimitOptions): InternationalDutyLimit[] {
    const gridDutyLimits = options.isInboundFlightSegmentGreaterThan5HoursTZD ? INTERNATIONAL_GRID_DUTY_LIMITS.TZDof5OrMore : INTERNATIONAL_GRID_DUTY_LIMITS.TZDof5OrLess;
    const { crewNumberOfPilots, layoverLength } = options;
    const { twoPilots, threePilots, fourPilots } = gridDutyLimits;
    const { reset, adjusted, notAdjusted, blockHours } = crewNumberOfPilots === 2 ? twoPilots : crewNumberOfPilots === 3 ? threePilots : fourPilots;
    const sleepState = getSleepState(layoverLength || 8); // defaults to 8 hours (non-adjusted) if layoverLength is not provided
    const gridDutyLimitsResults = sleepState === 'reset' ? reset : sleepState === 'adjusted' ? adjusted : notAdjusted;

    const nonGridDutyLimits = options.crewNumberOfPilots === 2 ? INTERNATIONAL_NON_GRID_DUTY_LIMITS.twoPilots : options.crewNumberOfPilots === 3 ? INTERNATIONAL_NON_GRID_DUTY_LIMITS.threePilots : options.crewNumberOfPilots === 4 ? INTERNATIONAL_NON_GRID_DUTY_LIMITS.fourPilots : INTERNATIONAL_NON_GRID_DUTY_LIMITS.ulr;

    if (options?.isGrid) {
      return gridDutyLimitsResults.map((dutyLimit) => {
        const { scheduledDuty, landings } = dutyLimit;
        return { scheduled: scheduledDuty, landings, blockHours };
      });
    } else {
      const { scheduledDuty, operationalDuty, ...notes } = nonGridDutyLimits;
      return [{ scheduled: scheduledDuty, operational: operationalDuty, blockHours, ...notes }];
    }
  }

  // TODO: Does not account for reset: 30 hours for EUR SIBA only following DH to theater
  function getSleepState (layoverLength: number) {
    if (layoverLength >= 32) { return 'reset'; }
    if (layoverLength >= 18) { return 'adjusted'; }
    return 'notAdjusted';
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

  return { domestic, international, dutyStartTimeLBT };
}
