import { describe, expect, it } from 'vitest';
import { setup } from '@nuxt/test-utils';

import { useRestRecover } from '../composables/useRestRecover';
import type { DomesticRestOptions, InternationalRestOptions, RestOptions } from '~/sched-committee-types';

// npm run test

const defaultDomesticRestOptions: DomesticRestOptions = {
  afterExceed8BlockHoursIn24Hours: false,
  exception12C2dAfterExceeding735ActualBlockHours: false,
  exception12C2dPriorToExceeding735ActualBlockHours: false,
  hotelStbyScenario: false,
  operatingInCriticalPeriod: false,
  priorToExceed8BlockHoursIn24Hours: false,
};

const defaultInternationalRestOptions: InternationalRestOptions = {

  doubleCrew: false,
  lateArrival: false,
  willExceed8BlockHoursOr12HoursOnDuty: false,
};

describe('test domestic rest', async () => {
  await setup({
    server: false, // ssr: false

    build: false, // false if browser or server is disabled)
  });

  // tests

  // no exceptions
  // pairing construction > 48 hours prior to showtime
  it('pairing construction > 48 hours prior to showtime', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options: RestOptions = {
      isInternational: false,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 49,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 10 * 60 + 15;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // pairing construction < 48 hours prior to showtime

  // exceptions
  // operating in critical period

  // hotel stanbdy scenario

  // prior to exceeding 8 in 24

  // after exceeding 8 in 24

  // exception 12.C.2.D
});

describe('test international rest', () => {
  // tests

  // pairing construction > 96 hours prior to showtime
  it('pairing construction > 96 hours prior to showtime', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options: RestOptions = {
      isInternational: true,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 97,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 14 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // pairing construction < 96 hours prior to showtime
  // no exceptions

  // double crew

  // will exceed 8 block hours or 12 hours on duty

  // late arrivals
});
