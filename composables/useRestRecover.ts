// © 2024 Air Line Pilots Association, International.

// This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU Affero General Public License as published by
//     the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.

//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU Affero General Public License for more details.

//     You should have received a copy of the GNU Affero General Public License
//     along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { addMinutes } from 'date-fns';
import { computed, toValue } from 'vue';
import type { RestOptions, CBALink } from '~/sched-committee-types';

type RestLimit = {
  scheduled: number,
  operational?: number,
  notes?: string[],
  cbaLink?: CBALink,
}

const DOMESTIC_REQUIRED_REST = {
  notes: ['The required rest is determined by when the pairing is built, along with the subsequent type of activity.'],

  pairingConstructedGreaterThan48HoursPriorToShowtime: {
    nextDutyOperational: 10 * 60 + 15, // 10:15
    nextDutyDeadhead: 8 * 60, // 8:00,
  },
  pairingConstructedLessThan48HoursPriorToShowtime: {
    nextDutyOperational: 9 * 60, // 9:00
    nextDutyDeadhead: 8 * 60, // 8:00

  },
  operationallyReducable: {
    nextDutyOperational: 8 * 60, // 8:00
    nextDutyDeadhead: 8 * 60, // 8:00

  },
  operatingInCriticalPeriod: {

    scheduled: 12 * 60,
    notes: ['May be reduced when deadheading or an operational emergency.'],
    cbaLink: {
      reference: '12.C.6.d',
      link: 'https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12C', // TODO: placeholder
    },
  },
  hotelStbyScenario: {
    scheduled: 12 * 60,
    notes: [], // gives a typescript error if not present
    cbaLink: {
      reference: '12.B.3.b',
      link: 'https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12C', // TODO: placeholder
    },
  },
  priorToExceed8BlockHoursIn24Hours: {
    scheduled: 9 * 60,
    operational: 8 * 60,
    notes: ['Your scheduled rest must be the greater of 9 hours or twice the block hours flown in previous duty period.'],
    cbaLink: {
      reference: '12.C.2.b and 12.C.6.b',
      link: 'https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12C', // TODO: placeholder
    },
  },
  afterExceed8BlockHoursIn24Hours: {
    scheduled: 17 * 60,
    operational: 8 * 60,
    notes: [],
    cbaLink: {
      reference: '12.C.2.b and 12.C.6.b',
      link: 'https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12C', // TODO: placeholder
    },
  },
  exception12C2d: {
    priorToExceeding735ActualBlockHours: {
      scheduled: 10 * 60 + 15,
      operational: 9 * 60 + 15,
      notes: ['Flight Segment Restriction: For further restrictions outside the scope of this required rest article, see 12.C.2.d.ii.'],
      cbaLink: {
        reference: '12.C.2.d.ii.',
        link: 'https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12C', // TODO: placeholder
      },
    },
    afterExceeding735ActualBlockHours: {
      scheduled: 13 * 60,
      operational: 12 * 60,
      notes: ['Flight Segment Restriction: For further restrictions outside the scope of this required rest article, see 12.C.2.d.ii.'],
      cbaLink: {
        reference: '12.C.2.d.ii.',
        link: 'https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12C', // TODO: placeholder
      },
    },
  },

};

const INTERNATIONAL_REQUIRED_REST = {
  pairingConstructedGreaterThan96HoursPriorToShowtime: {
    previousDutyRevenue: {
      nextDutyRevenue: 14 * 60,
      nextDutyDeadhead: 14 * 60,
      nextDutyHotelStby: 12 * 60,
    },
    previousDutyOther: {
      nextDutyRevenue: 12 * 60,
      nextDutyDeadhead: 12 * 60,
      nextDutyHotelStby: 12 * 60,
    },

  },
  pairingConstructedLessThan96HoursPriorToShowtime: {
    scheduled: 12 * 60,
    notes: ['12.D.7.a'],
    exceed8BlockHoursOr12HoursOnDuty: {
      scheduled: 17 * 60,
      operational: 16 * 60,
      notes: ['May be operationally reduced to 16 hours, unless actual block hours did not exceed 8:00 and actual hours on duty did not exceed 12:00. In that case, rest is operationally reduceable to 12 hours.'],
      cbaLink: {
        reference: '12.D.7.c',
        link: 'https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12C', // TODO: placeholder
      },
    },
    lateArrival: {
      scheduled: 12 * 60,
      notes: [
        'May reduce the layover to protect an on-time departure.',
        'Add 1 minute for each minute the previous (late) duty period exceeded the applicable scheduled on-duty limitation.',
        'Example: if the previous duty period was exceeded by 30 minutes, the required rest is 12:30.',

      ],
      cbaLink: {
        reference: '12.D.7.d',
        link: 'https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12C', // TODO: placeholder
      },
    },
    doubleCrew: {
      scheduled: 17 * 60,
      operational: 16 * 60,

      cbaLink: {
        reference: '12.D.8',
        link: 'https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12C', // TODO: placeholder
      },
    },

  },
};

export function useRestRecover (dutyEndTimeZulu: Ref<Date>, restOptions: Ref<RestOptions>) {
  const results = computed(() => calculateRest(toValue(restOptions)));
  const restMinutesRequiredScheduled = computed(() => results.value.restMinutesRequiredScheduled);
  const restMinutesOperationallyReducableTo = computed(() => results.value.restMinutesOperationallyReducableTo);
  const notes = computed(() => results.value.notes);
  const cbaLink = computed(() => results.value.cbaLink);

  const restEndTimeZulu = computed(() => addMinutes(dutyEndTimeZulu.value, restMinutesRequiredScheduled.value));

  return { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink };
};

function calculateRest (options: RestOptions) {
  // reset state
  let restLimits: RestLimit, restMinutesRequiredScheduled: number, restMinutesOperationallyReducableTo: number | undefined, notes: string[];

  if (!options.isInternational) {
    if (options.domesticOptions.afterExceed8BlockHoursIn24Hours) {
      restLimits = DOMESTIC_REQUIRED_REST.afterExceed8BlockHoursIn24Hours;
    } else if (options.domesticOptions.operatingInCriticalPeriod) {
      restLimits = DOMESTIC_REQUIRED_REST.operatingInCriticalPeriod;
      // restMinutesRequiredScheduled.value = restLimits.scheduled;
      // notes.value = [...restLimits.notes];
    } else if (options.domesticOptions.hotelStbyScenario) {
      restLimits = DOMESTIC_REQUIRED_REST.hotelStbyScenario;
      // restMinutesRequiredScheduled.value = restLimits.scheduled;
      // notes.value = [...restLimits.notes];
    } else if (options.domesticOptions.priorToExceed8BlockHoursIn24Hours) { // if (options?.domesticOptions?.priorToExceed8BlockHoursIn24Hours) TODO: improve this else logic
      restLimits = DOMESTIC_REQUIRED_REST.priorToExceed8BlockHoursIn24Hours;
      // restMinutesRequiredScheduled.value = restLimits.scheduled;
      // restMinutesOperationallyReducableTo.value = restLimits.operational;
      // notes.value = [...restLimits.notes];
    } else {
      const pairingType = options.minutesPairingConstructedPriorToShowtime / 60 > 48 ? DOMESTIC_REQUIRED_REST.pairingConstructedGreaterThan48HoursPriorToShowtime : DOMESTIC_REQUIRED_REST.pairingConstructedLessThan48HoursPriorToShowtime;
      restLimits = { scheduled: options.nextDuty === 'Deadhead' ? pairingType.nextDutyDeadhead : pairingType.nextDutyOperational };
      restLimits.operational = options.nextDuty === 'Deadhead' ? DOMESTIC_REQUIRED_REST.operationallyReducable.nextDutyDeadhead : DOMESTIC_REQUIRED_REST.operationallyReducable.nextDutyOperational;
      restLimits.notes = [...DOMESTIC_REQUIRED_REST.notes];
    }

    restMinutesRequiredScheduled = restLimits.scheduled;
    restMinutesOperationallyReducableTo = 'operational' in restLimits ? restLimits.operational : undefined;
    notes = restLimits.notes ? [...restLimits.notes] : [];
  } else { // international
  // eslint-disable-next-line no-lonely-if
    if (options.minutesPairingConstructedPriorToShowtime / 60 > 96) {
      const pairingType = INTERNATIONAL_REQUIRED_REST.pairingConstructedGreaterThan96HoursPriorToShowtime;
      if (options.prevDuty === 'Operational') {
        if (options.nextDuty === 'Operational') {
          restLimits = { scheduled: pairingType.previousDutyRevenue.nextDutyRevenue };
        } else if (options.nextDuty === 'Deadhead') {
          restLimits = { scheduled: pairingType.previousDutyRevenue.nextDutyDeadhead };
        } else { // Hotel standby
          restLimits = { scheduled: pairingType.previousDutyRevenue.nextDutyHotelStby };
        }
      } else { // previous duty deadhead or hotel standby TODO: understand lonely-if
      // eslint-disable-next-line no-lonely-if
        if (options.nextDuty === 'Operational') {
          restLimits = { scheduled: pairingType.previousDutyOther.nextDutyRevenue };
        } else if (options.nextDuty === 'Deadhead') {
          restLimits = { scheduled: pairingType.previousDutyOther.nextDutyDeadhead };
        } else { // Hotel standby
          restLimits = { scheduled: pairingType.previousDutyOther.nextDutyHotelStby };
        }
      }
    } else { // constructed less than 96 hours prior to showtime
    // const restLimits = INTERNATIONAL_REQUIRED_REST.pairingConstructedLessThan96HoursPriorToShowtime;

      // eslint-disable-next-line no-lonely-if
      if (options?.internationalOptions?.doubleCrew) {
        restLimits = INTERNATIONAL_REQUIRED_REST.pairingConstructedLessThan96HoursPriorToShowtime.doubleCrew;
      // restMinutesRequiredScheduled.value = restLimits.doubleCrew.scheduled;
      // restMinutesOperationallyReducableTo.value = restLimits.doubleCrew.operational;
      // notes.value = [...restLimits.doubleCrew.notes];
      } else if (options?.internationalOptions?.willExceed8BlockHoursOr12HoursOnDuty) {
        restLimits = INTERNATIONAL_REQUIRED_REST.pairingConstructedLessThan96HoursPriorToShowtime.exceed8BlockHoursOr12HoursOnDuty;
      // restMinutesRequiredScheduled.value = restLimits.exceed8BlockHoursOr12HoursOnDuty.scheduled;
      // restMinutesOperationallyReducableTo.value = restLimits.exceed8BlockHoursOr12HoursOnDuty.operational;
      // notes.value = [...restLimits.exceed8BlockHoursOr12HoursOnDuty.notes];
      } else if (options?.internationalOptions?.lateArrival) {
        restLimits = INTERNATIONAL_REQUIRED_REST.pairingConstructedLessThan96HoursPriorToShowtime.lateArrival;
      // restMinutesRequiredScheduled.value = restLimits.lateArrival.scheduled;
      // notes.value = [...restLimits.lateArrival.notes];
      } else {
        restLimits = INTERNATIONAL_REQUIRED_REST.pairingConstructedLessThan96HoursPriorToShowtime;
      // restMinutesRequiredScheduled.value = restLimits.scheduled;
      // notes.value = [...restLimits.notes];
      }
    }
  }
  restMinutesRequiredScheduled = restLimits.scheduled;
  restMinutesOperationallyReducableTo = 'operational' in restLimits ? restLimits.operational : undefined;
  notes = restLimits.notes ? [...restLimits.notes] : [];

  const cbaLink = restLimits && 'cbaLink' in restLimits ? restLimits?.cbaLink : undefined;

  return { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, notes, cbaLink };
}
