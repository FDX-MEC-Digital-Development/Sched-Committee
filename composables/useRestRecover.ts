// © 2024 Air Line Pilots Association, International.

import { addMinutes } from 'date-fns';

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

const DOMESTIC_REQUIRED_REST = {
  pairingConstructedGreaterThan48HoursPriorToShowtime: {
    nextDutyOperational: 10 * 60 + 15, // 10:15
    nextDutyDeadhead: 8 * 60, // 8:00
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

    baseline: 12,
    notes: ['May be reduced when deadheading or an operational emergency.', '12.C.6.d'],
  },
  hotelStbyScenario: {
    baseline: 12,
    notes: ['12.B.3.b'],
  },
  priorToExceed8BlockHoursIn24Hours: {
    baseline: 9,
    notes: [''],

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
    baseline: 12,
    notes: ['12.D.7.a'],
    exceed8BlockHoursOr12HoursOnDuty: {
      scheduled: 17,
      operational: 16,
      notes: ['May be operationally reduced to 16 hours, unless actual block hours did not exceed 8:00 and actual hours on duty did not exceed 12:00. In that case, rest is operationally reduceable to 12 hours.', '12.D.7.c'],
    },
    lateArrival: {
      baseline: 12,
      notes: [
        'May reduce the layover to protect an on-time departure.',
        'Add 1 minute for each minute the previous (late) duty period exceeded the applicable scheduled on-duty limitation.',
        'Example: if the previous duty period was exceeded by 30 minutes, the required rest is 12:30.',
        '12.D.7.d',
      ],
    },
    doubleCrew: {
      scheduled: 17,
      operational: 16,
      notes: ['12.D.8'],
    },

  },
};
type DutyType = 'Operational' | 'Deadhead' | 'HotelStby'
interface InternationalRestOptions {
  doubleCrew: Boolean,
  willExceed8BlockHoursOr12HoursOnDuty: Boolean,
  lateArrival: Boolean,
}
interface DomesticRestOptions {
  operatingInCriticalPeriod: Boolean, // must also receive less than 11 hours of rest operationally for this condition to be true
  hotelStbyScenario: Boolean,
  priorToExceed8BlockHoursIn24Hours: Boolean,
  afterExceed8BlockHoursIn24Hours: Boolean,
  exception12C2d: Boolean,
}
interface RestOptions {
  isInternational: Boolean,
  internationalOptions?: InternationalRestOptions,
  domesticOptions?: DomesticRestOptions,
  minutesPairingConstructedPriorToShowtime: number,
  nextDuty: DutyType,
  prevDuty: DutyType,
}

export const useUseRestRecover = (dutyEndTimeZulu: MaybeRef<Date>, restOptions: MaybeRef<RestOptions>) => {
  const endTime = toValue(dutyEndTimeZulu);
  const options = toValue(restOptions);
  const restMinutesRequired = ref();
  const notes = ref<string[]>([]);
  const restMinutesOperationallyReducableTo = ref();

  if (!options.isInternational) {
    const restLimits = options.minutesPairingConstructedPriorToShowtime / 60 > 48 ? DOMESTIC_REQUIRED_REST.pairingConstructedGreaterThan48HoursPriorToShowtime : DOMESTIC_REQUIRED_REST.pairingConstructedLessThan48HoursPriorToShowtime;
    restMinutesRequired.value = options.nextDuty === 'Deadhead' ? restLimits.nextDutyDeadhead : restLimits.nextDutyOperational;
    restMinutesOperationallyReducableTo.value = options.nextDuty === 'Deadhead' ? DOMESTIC_REQUIRED_REST.operationallyReducable.nextDutyDeadhead : DOMESTIC_REQUIRED_REST.operationallyReducable.nextDutyOperational;
  } else { // international
    // eslint-disable-next-line no-lonely-if
    if (options.minutesPairingConstructedPriorToShowtime / 60 > 96) {
      const restLimits = INTERNATIONAL_REQUIRED_REST.pairingConstructedGreaterThan96HoursPriorToShowtime;
      if (options.prevDuty === 'Operational') {
        if (options.nextDuty === 'Operational') {
          restMinutesRequired.value = restLimits.previousDutyRevenue.nextDutyRevenue;
        } else if (options.nextDuty === 'Deadhead') {
          restMinutesRequired.value = restLimits.previousDutyRevenue.nextDutyDeadhead;
        } else { // Hotel standby
          restMinutesRequired.value = restLimits.previousDutyRevenue.nextDutyHotelStby;
        }
      } else { // previous duty deadhead or hotel standby TODO: understand lonely-if
        // eslint-disable-next-line no-lonely-if
        if (options.nextDuty === 'Operational') {
          restMinutesRequired.value = restLimits.previousDutyOther.nextDutyRevenue;
        } else if (options.nextDuty === 'Deadhead') {
          restMinutesRequired.value = restLimits.previousDutyOther.nextDutyDeadhead;
        } else { // Hotel standby
          restMinutesRequired.value = restLimits.previousDutyOther.nextDutyHotelStby;
        }
      }
    } else { // constructed less than 96 hours prior to showtime
      const restLimits = INTERNATIONAL_REQUIRED_REST.pairingConstructedLessThan96HoursPriorToShowtime;

      if (options?.internationalOptions?.doubleCrew) {
        restMinutesRequired.value = restLimits.doubleCrew.scheduled;
        restMinutesOperationallyReducableTo.value = restLimits.doubleCrew.operational;
        notes.value = [...restLimits.doubleCrew.notes];
      } else if (options?.internationalOptions?.willExceed8BlockHoursOr12HoursOnDuty) {
        restMinutesRequired.value = restLimits.exceed8BlockHoursOr12HoursOnDuty.scheduled;
        restMinutesOperationallyReducableTo.value = restLimits.exceed8BlockHoursOr12HoursOnDuty.operational;
        notes.value = [...restLimits.exceed8BlockHoursOr12HoursOnDuty.notes];
      } else if (options?.internationalOptions?.lateArrival) {
        restMinutesRequired.value = restLimits.lateArrival.baseline;
        notes.value = [...restLimits.lateArrival.notes];
      } else {
        restMinutesRequired.value = restLimits.baseline;
        notes.value = [...restLimits.notes];
      }
    }
  }

  const restEndTimeZulu = computed(() => addMinutes(endTime, restMinutesRequired.value));

  return { restMinutesRequired, restMinutesOperationallyReducableTo, restEndTimeZulu, notes };
};
