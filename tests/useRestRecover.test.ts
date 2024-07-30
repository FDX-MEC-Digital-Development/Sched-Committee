import { describe, expect, it } from 'vitest';
import { setup } from '@nuxt/test-utils';

import { useDutyLimits } from '../composables/useDutyLimits';
import type { DutyLimitOptions } from '~/sched-committee-types';

// npm run test

describe('test domestic rest', async () => {
  await setup({
    server: false, // ssr: false

    build: false, // false if browser or server is disabled)
  });

  // tests

  // no exceptions
  // pairing construction > 48 hours prior to showtime

  // pairing construction < 48 hours prior to showtime

  // exceptions
  // operating in critical period

  // hotel stanbdy scenario

  // prior to exceeding 8 in 24

  // after exceeding 8 in 24

  // exception 12.C.2.D

  it('day flight 1800Z MEM showtime', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options: DutyLimitOptions = { domicile: 'MEM' };
    const expectedLBT = 1300;

    const { domestic, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits = {
      scheduled: 13 * 60,
      operational: 14.5 * 60,
      far: 16 * 60,
      endOfScheduledDutyDate: new Date('2021-09-02T07:00:00Z'),
      endOfOperationalDutyDate: new Date('2021-09-02T08:30:00Z'),
      endOfFARDutyDate: new Date('2021-09-02T10:00:00Z'),
    };

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(domestic.value).toEqual(expectedDutyLimits);
  });
});

describe('test international rest', () => {

  // tests

  // pairing construction > 96 hours prior to showtime

  // pairing construction < 96 hours prior to showtime
  // no exceptions

  // double crew

  // will exceed 8 block hours or 12 hours on duty

  // late arrivals

});
