import { describe, expect, it } from 'vitest';
import { setup } from '@nuxt/test-utils';

import { useDutyLimits } from '../composables/useDutyLimits';
import { DutyLimitOptions, InternationalDuty } from '~/sched-committee-types';

// npm run test

// tests written during daylight savings time, and may need to be adjusted for standard time

describe('test domestic duty limits', async () => {
  await setup({
    server: false, // ssr: false

    build: false, // false if browser or server is disabled)
  });

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

  it('day flight 1315 ANC showtime (should be 0515 LBT I think)', () => {
    // blended duty limit
    const dutyStartTimeZulu = new Date('2021-09-01T13:15:00Z');
    const options: DutyLimitOptions = { domicile: 'ANC' };
    const expectedLBT = 515;

    const { domestic, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits = {
      scheduled: 12 * 60,
      operational: 13.5 * 60,
      far: 16 * 60,

      endOfScheduledDutyDate: new Date('2021-09-02T01:15:00Z'),
      endOfOperationalDutyDate: new Date('2021-09-02T02:45:00Z'),
      endOfFARDutyDate: new Date('2021-09-02T05:15:00Z'),
    };

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(domestic.value).toEqual(expectedDutyLimits);
  });

  it('day flight 1045Z MEM showtime (should be 0545 LBT I think)', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T10:45:00Z');
    const options: DutyLimitOptions = { domicile: 'MEM' };
    const expectedLBT = 545;

    const { domestic, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits = {
      scheduled: 13 * 60,
      operational: 14 * 60,
      far: 16 * 60,

      endOfScheduledDutyDate: new Date('2021-09-01T23:45:00Z'),
      endOfOperationalDutyDate: new Date('2021-09-02T00:45:00Z'),
      endOfFARDutyDate: new Date('2021-09-02T02:45:00Z'),
    };
    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(domestic.value).toEqual(expectedDutyLimits);
  });

  it('day flight 1045Z MEM showtime with one optional (should be 0545 LBT I think)', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T10:45:00Z');
    const options: DutyLimitOptions = { is2TripsWithOneOptional: true, domicile: 'MEM' };
    const expectedLBT = 545;

    const { domestic, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits = {
      scheduled: 13.5 * 60,
      operational: 15 * 60,
      far: 16 * 60,

      endOfScheduledDutyDate: new Date('2021-09-02T00:15:00Z'),
      endOfOperationalDutyDate: new Date('2021-09-02T01:45:00Z'),
      endOfFARDutyDate: new Date('2021-09-02T02:45:00Z'),
    };

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(domestic.value).toEqual(expectedDutyLimits);
  });

  it('day flight 1800Z MEM showtime with 2 trips and one optional', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T18:00:00Z');

    const options: DutyLimitOptions = { is2TripsWithOneOptional: true, domicile: 'MEM' };
    const expectedLBT = 1300;

    const { domestic, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits = {
      scheduled: 13.5 * 60,
      operational: 15 * 60,
      far: 16 * 60,

      endOfScheduledDutyDate: new Date('2021-09-02T07:30:00Z'),
      endOfOperationalDutyDate: new Date('2021-09-02T09:00:00Z'),
      endOfFARDutyDate: new Date('2021-09-02T10:00:00Z'),
    };

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(domestic.value).toEqual(expectedDutyLimits);
  });

  it('night flight 0500Z IND showtime (should be 0000LBT I think)', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T05:00:00Z');
    const options: DutyLimitOptions = { domicile: 'IND' };
    const expectedLBT = 0;

    const { domestic, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits = {
      scheduled: 10 * 60,
      operational: 13 * 60,
      far: 16 * 60,

      endOfScheduledDutyDate: new Date('2021-09-01T15:00:00Z'),
      endOfOperationalDutyDate: new Date('2021-09-01T18:00:00Z'),
      endOfFARDutyDate: new Date('2021-09-01T21:00:00Z'),
    };

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(domestic.value).toEqual(expectedDutyLimits);
  });

  it('night flight 0500Z IND showtime with 2 trips and one optional (should be 0000LBT I think)', () => {
    // blended duty limit TODO: Verify scheduledDutyLimit is 11.5
    const dutyStartTimeZulu = new Date('2021-09-01T05:00:00Z');
    const options: DutyLimitOptions = { is2TripsWithOneOptional: true, domicile: 'IND' };
    const expectedLBT = 0;

    const { domestic, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits = {
      scheduled: 11.5 * 60,
      operational: 14.5 * 60,
      far: 16 * 60,

      endOfScheduledDutyDate: new Date('2021-09-01T16:30:00Z'),
      endOfOperationalDutyDate: new Date('2021-09-01T19:30:00Z'),
      endOfFARDutyDate: new Date('2021-09-01T21:00:00Z'),
    };

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(domestic.value).toEqual(expectedDutyLimits);
  });

  it('critical flight 1000Z OAK showtime (should be 0300LBT I think)', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T10:00:00Z');
    const options: DutyLimitOptions = { domicile: 'OAK' };
    const expectedLBT = 300;

    const { domestic, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits = {
      scheduled: 9 * 60,
      operational: 10.5 * 60,
      far: 16 * 60,

      endOfScheduledDutyDate: new Date('2021-09-01T19:00:00Z'),
      endOfOperationalDutyDate: new Date('2021-09-01T20:30:00Z'),
      endOfFARDutyDate: new Date('2021-09-02T02:00:00Z'),
    };

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(domestic.value).toEqual(expectedDutyLimits);
  });

  it('critical flight 1000Z OAK showtime with 2 trips and one optional (should be 0300LBT I think)', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T10:00:00Z');

    const options: DutyLimitOptions = { is2TripsWithOneOptional: true, domicile: 'OAK' };
    const expectedLBT = 300;

    const { domestic, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits = {
      scheduled: 9 * 60,
      operational: 10.5 * 60,
      far: 16 * 60,

      endOfScheduledDutyDate: new Date('2021-09-01T19:00:00Z'),
      endOfOperationalDutyDate: new Date('2021-09-01T20:30:00Z'),
      endOfFARDutyDate: new Date('2021-09-02T02:00:00Z'),
    };

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(domestic.value).toEqual(expectedDutyLimits);
  });
});

describe('test grid international duty limits', () => {
  it('TZD of 5 or more, 2 pilots, reset', () => {
    const dutyStartTimeZulu = new Date('2035-09-01T01:00:00Z');
    const options: DutyLimitOptions = { isInboundFlightSegmentGreaterThan5HoursTZD: true, crewNumberOfPilots: 2, layoverLength: 40, isGrid: true };

    const { international } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits: InternationalDuty[] = [{
      scheduled: 13.5 * 60,
      landings: 3,
      blockHours: { scheduled: 8 },
      endOfScheduledDutyDate: new Date('2035-09-01T14:30:00Z'),
    },

    {
      scheduled: 12 * 60,
      landings: 4,
      blockHours: { scheduled: 8 },
      endOfScheduledDutyDate: new Date('2035-09-01T13:00:00Z'),
    }];

    expect(international.value).toEqual(expectedDutyLimits);
  });

  it('TZD of 5 or more, 2 pilots, adjusted', () => {
    const dutyStartTimeZulu = new Date('2035-09-01T01:00:00Z');
    const options: DutyLimitOptions = { isInboundFlightSegmentGreaterThan5HoursTZD: true, crewNumberOfPilots: 2, layoverLength: 20, isGrid: true };

    const { international } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits: InternationalDuty[] = [{
      scheduled: 10 * 60,
      landings: 2,
      blockHours: { scheduled: 8 },
      endOfScheduledDutyDate: new Date('2035-09-01T11:00:00Z'),
    },

    ];

    expect(international.value).toEqual(expectedDutyLimits);
  });

  it('TZD of 5 or more, 2 pilots, not adjusted', () => {
    const dutyStartTimeZulu = new Date('2035-09-01T01:00:00Z');
    const options: DutyLimitOptions = { isInboundFlightSegmentGreaterThan5HoursTZD: true, crewNumberOfPilots: 2, layoverLength: 10, isGrid: true };

    const { international } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits: InternationalDuty[] = [{
      scheduled: 8.5 * 60,
      landings: 2,
      blockHours: { scheduled: 8 },
      endOfScheduledDutyDate: new Date('2035-09-01T09:30:00Z'),
    },

    ];

    expect(international.value).toEqual(expectedDutyLimits);
  });

  it('TZD of 5 or more, 3 pilots, reset', () => {
    const dutyStartTimeZulu = new Date('2035-09-01T01:00:00Z');
    const options: DutyLimitOptions = { isInboundFlightSegmentGreaterThan5HoursTZD: true, crewNumberOfPilots: 3, layoverLength: 40, isGrid: true };

    const { international } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits: InternationalDuty[] = [{
      scheduled: 13.5 * 60,
      landings: 2,
      blockHours: { scheduled: 12 },
      endOfScheduledDutyDate: new Date('2035-09-01T14:30:00Z'),
    },

    ];

    expect(international.value).toEqual(expectedDutyLimits);
  });

  it('TZD of 5 or more, 3 pilots, adjusted', () => {
    const dutyStartTimeZulu = new Date('2035-09-01T01:00:00Z');
    const options: DutyLimitOptions = { isInboundFlightSegmentGreaterThan5HoursTZD: true, crewNumberOfPilots: 3, layoverLength: 20, isGrid: true };

    const { international } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits: InternationalDuty[] = [{
      scheduled: 12.5 * 60,
      landings: 2,
      blockHours: { scheduled: 12 },
      endOfScheduledDutyDate: new Date('2035-09-01T13:30:00Z'),
    },

    ];

    expect(international.value).toEqual(expectedDutyLimits);
  });

  it('TZD of 5 or more, 3 pilots, not adjusted', () => {
    const dutyStartTimeZulu = new Date('2035-09-01T01:00:00Z');
    const options: DutyLimitOptions = { isInboundFlightSegmentGreaterThan5HoursTZD: true, crewNumberOfPilots: 3, layoverLength: 10, isGrid: true };

    const { international } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits: InternationalDuty[] = [{
      scheduled: 10 * 60,
      landings: 2,
      blockHours: { scheduled: 12 },
      endOfScheduledDutyDate: new Date('2035-09-01T11:00:00Z'),
    },

    ];

    expect(international.value).toEqual(expectedDutyLimits);
  });

  it('TZD of 5 or more, 4 pilots, reset', () => {
    const dutyStartTimeZulu = new Date('2035-09-01T01:00:00Z');
    const options: DutyLimitOptions = { isInboundFlightSegmentGreaterThan5HoursTZD: true, crewNumberOfPilots: 4, layoverLength: 40, isGrid: true };

    const { international } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits: InternationalDuty[] = [{
      scheduled: 18 * 60,
      landings: 1,
      blockHours: { scheduled: 16 },
      endOfScheduledDutyDate: new Date('2035-09-01T19:00:00Z'),
    },

    ];

    expect(international.value).toEqual(expectedDutyLimits);
  });

  it('TZD of 5 or more, 4 pilots, adjusted', () => {
    const dutyStartTimeZulu = new Date('2035-09-01T01:00:00Z');
    const options: DutyLimitOptions = { isInboundFlightSegmentGreaterThan5HoursTZD: true, crewNumberOfPilots: 4, layoverLength: 20, isGrid: true };

    const { international } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits: InternationalDuty[] = [{
      scheduled: 16 * 60,
      landings: 1,
      blockHours: { scheduled: 16 },
      endOfScheduledDutyDate: new Date('2035-09-01T17:00:00Z'),
    },

    ];

    expect(international.value).toEqual(expectedDutyLimits);
  });

  it('TZD of 5 or more, 4 pilots, not adjusted', () => {
    const dutyStartTimeZulu = new Date('2035-09-01T01:00:00Z');
    const options: DutyLimitOptions = { isInboundFlightSegmentGreaterThan5HoursTZD: true, crewNumberOfPilots: 4, layoverLength: 10, isGrid: true };

    const { international } = useDutyLimits(dutyStartTimeZulu, options);

    const expectedDutyLimits: InternationalDuty[] = [{
      scheduled: 16 * 60,
      landings: 1,
      blockHours: { scheduled: 16 },
      endOfScheduledDutyDate: new Date('2035-09-01T17:00:00Z'),
    },

    ];

    expect(international.value).toEqual(expectedDutyLimits);
  });
});
