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
import { computed, ref, watchEffect, toValue } from 'vue';
import type { RestOptions, CBALink, DomesticRestOptions } from '~/sched-committee-types';

type RestLimit = {
  scheduled: number,
  operational?: number,
  notes?: string[],
  cbaLink?: CBALink,
}

type DomesticRestOptionKeys = keyof DomesticRestOptions;

type MappedDomesticRestOptions = {
  [key in DomesticRestOptionKeys]: RestLimit
};

type DomesticRequiredRest = MappedDomesticRestOptions & {
  notes: string[],
  scheduledIfPairingConstructedGreaterThan48HoursPriorToShowtime: {
    ifNextDutyOperational: number,
    ifNextDutyDeadhead: number,
  },
  scheduledIfPairingConstructedLessThan48HoursPriorToShowtime: {
    ifNextDutyOperational: number,
    ifNextDutyDeadhead: number,
  },
  operationallyReducableTo: {
    ifNextDutyOperational: number,
    ifNextDutyDeadhead: number,
  },
}
type PairingConstructedLessThan96HoursPriorToShowtimeKeys = 'doubleCrew' | 'willExceed8BlockHoursOr12HoursOnDuty' | 'lateArrival';
type MappedInternationalRestOptions = {
  [key in PairingConstructedLessThan96HoursPriorToShowtimeKeys]: RestLimit
}

type InternationalRequiredRest = {
  pairingConstructedGreaterThan96HoursPriorToShowtime: {
    ifPreviousDutyRevenue: {
      ifNextDutyRevenue: number,
      ifNextDutyDeadhead: number,
      ifNextDutyHotelStby: number,
    },
    ifPreviousDutyOther: {
      ifNextDutyRevenue: number,
      ifNextDutyDeadhead: number,
      ifNextDutyHotelStby: number,
    },
  },
  pairingConstructedLessThan96HoursPriorToShowtime: MappedInternationalRestOptions & {
    scheduled: number,
    notes: string[],
  },

}

const DOMESTIC_REQUIRED_REST: DomesticRequiredRest = {
  notes: ['The required rest is determined by when the pairing is built, along with the subsequent type of activity.'],

  scheduledIfPairingConstructedGreaterThan48HoursPriorToShowtime: {
    ifNextDutyOperational: 10 * 60 + 15, // 10:15
    ifNextDutyDeadhead: 8 * 60, // 8:00,
  },
  scheduledIfPairingConstructedLessThan48HoursPriorToShowtime: {
    ifNextDutyOperational: 9 * 60, // 9:00
    ifNextDutyDeadhead: 8 * 60, // 8:00

  },
  operationallyReducableTo: {
    ifNextDutyOperational: 8 * 60, // 8:00
    ifNextDutyDeadhead: 8 * 60, // 8:00

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
  exception12C2dPriorToExceeding735ActualBlockHours: {
    scheduled: 10 * 60 + 15,
    operational: 9 * 60 + 15,
    notes: ['Flight Segment Restriction: For further restrictions outside the scope of this required rest article, see 12.C.2.d.ii.'],
    cbaLink: {
      reference: '12.C.2.d.ii.',
      link: 'https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12C', // TODO: placeholder
    },
  },
  exception12C2dAfterExceeding735ActualBlockHours: {
    scheduled: 13 * 60,
    operational: 12 * 60,
    notes: ['Flight Segment Restriction: For further restrictions outside the scope of this required rest article, see 12.C.2.d.ii.'],
    cbaLink: {
      reference: '12.C.2.d.ii.',
      link: 'https://fdx.alpa.org/Portals/7/Documents/Committees/negotiating/contract-library/2015/2015FDXCBA_web.html#link_12C', // TODO: placeholder
    },
  },

};

const INTERNATIONAL_REQUIRED_REST: InternationalRequiredRest = {
  pairingConstructedGreaterThan96HoursPriorToShowtime: {
    ifPreviousDutyRevenue: {
      ifNextDutyRevenue: 14 * 60,
      ifNextDutyDeadhead: 14 * 60,
      ifNextDutyHotelStby: 12 * 60,
    },
    ifPreviousDutyOther: {
      ifNextDutyRevenue: 12 * 60,
      ifNextDutyDeadhead: 12 * 60,
      ifNextDutyHotelStby: 12 * 60,
    },

  },
  pairingConstructedLessThan96HoursPriorToShowtime: {
    scheduled: 12 * 60,
    notes: ['12.D.7.a'],
    willExceed8BlockHoursOr12HoursOnDuty: {
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

export function useRestRecover (dutyEndTimeZulu: MaybeRef<Date>, restOptions: MaybeRef<RestOptions>) {
  const endTime = toValue(dutyEndTimeZulu);
  const options = toValue(restOptions);
  const restMinutesRequiredScheduled = ref<number>(0);
  const notes = ref<string[]>([]);
  const cbaLink = ref<CBALink>();
  const restMinutesOperationallyReducableTo = ref();

  function calculateRest () {
    // reset state
    let restLimits: RestLimit;
    restMinutesOperationallyReducableTo.value = undefined;
    notes.value = [];
    cbaLink.value = undefined;
    restMinutesRequiredScheduled.value = 0;

    if (!options.isInternational) {
      const optionKey = (Object.keys(options.domesticOptions) as (keyof typeof options.domesticOptions)[]).find(
        key => options.domesticOptions[key],
      ); // find the key that is true (if any)
      if (optionKey === undefined) { // no exceptions
        const pairingType = options.minutesPairingConstructedPriorToShowtime / 60 > 48 ? DOMESTIC_REQUIRED_REST.scheduledIfPairingConstructedGreaterThan48HoursPriorToShowtime : DOMESTIC_REQUIRED_REST.scheduledIfPairingConstructedLessThan48HoursPriorToShowtime;
        console.log('pairingType', pairingType);
        restLimits = { scheduled: options.nextDuty === 'Deadhead' ? pairingType.ifNextDutyDeadhead : pairingType.ifNextDutyOperational };
        restLimits.operational = options.nextDuty === 'Deadhead' ? DOMESTIC_REQUIRED_REST.operationallyReducableTo.ifNextDutyDeadhead : DOMESTIC_REQUIRED_REST.operationallyReducableTo.ifNextDutyOperational;
        restLimits.notes = [...DOMESTIC_REQUIRED_REST.notes];
      } else {
        restLimits = DOMESTIC_REQUIRED_REST[optionKey as keyof DomesticRestOptions];
      }
    } else { // international
    // eslint-disable-next-line no-lonely-if
      if (options.minutesPairingConstructedPriorToShowtime / 60 > 96) {
        const pairingType = INTERNATIONAL_REQUIRED_REST.pairingConstructedGreaterThan96HoursPriorToShowtime;
        if (options.prevDuty === 'Revenue') {
          if (options.nextDuty === 'Revenue') {
            restLimits = { scheduled: pairingType.ifPreviousDutyRevenue.ifNextDutyRevenue };
          } else if (options.nextDuty === 'Deadhead') {
            restLimits = { scheduled: pairingType.ifPreviousDutyRevenue.ifNextDutyDeadhead };
          } else { // Hotel standby
            restLimits = { scheduled: pairingType.ifPreviousDutyRevenue.ifNextDutyHotelStby };
          }
        } else { // previous duty deadhead or hotel standby TODO: understand lonely-if
        // eslint-disable-next-line no-lonely-if
          if (options.nextDuty === 'Revenue') {
            restLimits = { scheduled: pairingType.ifPreviousDutyOther.ifNextDutyRevenue };
          } else if (options.nextDuty === 'Deadhead') {
            restLimits = { scheduled: pairingType.ifPreviousDutyOther.ifNextDutyDeadhead };
          } else { // Hotel standby
            restLimits = { scheduled: pairingType.ifPreviousDutyOther.ifNextDutyHotelStby };
          }
        }
      } else { // constructed less than 96 hours prior to showtime
        const optionsKey = (Object.keys(INTERNATIONAL_REQUIRED_REST.pairingConstructedLessThan96HoursPriorToShowtime) as PairingConstructedLessThan96HoursPriorToShowtimeKeys[]).find(
          key => options.internationalOptions[key],
        ); // find the key that is true (if any)

        if (optionsKey === undefined) {
          restLimits = INTERNATIONAL_REQUIRED_REST.pairingConstructedLessThan96HoursPriorToShowtime; // no exceptions
        } else {
          restLimits = INTERNATIONAL_REQUIRED_REST.pairingConstructedLessThan96HoursPriorToShowtime[optionsKey];
        }
      }
    }
    restMinutesRequiredScheduled.value = restLimits.scheduled;
    restMinutesOperationallyReducableTo.value = 'operational' in restLimits ? restLimits.operational : undefined;
    notes.value = restLimits.notes ? [...restLimits.notes] : [];

    cbaLink.value = restLimits && 'cbaLink' in restLimits ? restLimits?.cbaLink : undefined;
  }

  watchEffect(() => {
    // calculate rest when dependencies change
    calculateRest();
  });

  const restEndTimeZulu = computed(() => addMinutes(endTime, restMinutesRequiredScheduled.value));

  return { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink };
};
