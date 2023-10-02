import { describe, expect, it } from 'vitest';
import { setup } from '@nuxt/test-utils';

import { useDutyLimits } from '../composables/useDutyLimits';

// npm run test

// tests written during daylight savings time, and may need to be adjusted for standard time

describe('test duty limit logic', async () => {
  await setup({
    server: false, // ssr: false

    build: false, // false if browser or server is disabled)
  });

  it('day flight 1800Z MEM showtime', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T18:00:00Z');
    const domicile = 'MEM';
    const expectedLBT = 1300;

    const { dutyLimits, endOfScheduledDutyTime, endOfOperationalDutyTime, endOfFARDutyTime, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, domicile);

    const expectedDutyLimits = {
      scheduledDutyLimit: 13 * 60,
      operationalDutyLimit: 14.5 * 60,
      farDutyLimit: 16 * 60,
    };
    const expectedEndOfScheduledDutyTime = new Date('2021-09-02T07:00:00Z');
    const expectedEndOfOperationalDutyTime = new Date('2021-09-02T08:30:00Z');
    const expectedEndOfFARDutyTime = new Date('2021-09-02T10:00:00Z');

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(dutyLimits.value).toEqual(expectedDutyLimits);
    expect(endOfScheduledDutyTime.value).toEqual(expectedEndOfScheduledDutyTime);
    expect(endOfOperationalDutyTime.value).toEqual(expectedEndOfOperationalDutyTime);
    expect(endOfFARDutyTime.value).toEqual(expectedEndOfFARDutyTime);
  });

  it('day flight 1315 ANC showtime (should be 0515 LBT I think)', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T13:15:00Z');
    const domicile = 'ANC';
    const expectedLBT = 515;

    const { dutyLimits, endOfScheduledDutyTime, endOfOperationalDutyTime, endOfFARDutyTime, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, domicile);

    const expectedDutyLimits = {
      scheduledDutyLimit: 13 * 60,
      operationalDutyLimit: 13.5 * 60,
      farDutyLimit: 16 * 60,
    };
    const expectedEndOfScheduledDutyTime = new Date('2021-09-02T02:15:00Z');
    const expectedEndOfOperationalDutyTime = new Date('2021-09-02T02:45:00Z');
    const expectedEndOfFARDutyTime = new Date('2021-09-02T05:15:00Z');

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(dutyLimits.value).toEqual(expectedDutyLimits);
    expect(endOfScheduledDutyTime.value).toEqual(expectedEndOfScheduledDutyTime);
    expect(endOfOperationalDutyTime.value).toEqual(expectedEndOfOperationalDutyTime);
    expect(endOfFARDutyTime.value).toEqual(expectedEndOfFARDutyTime);
  });

  it('day flight 1045Z MEM showtime (should be 0545 LBT I think)', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T10:45:00Z');
    const domicile = 'MEM';
    const expectedLBT = 545;

    const { dutyLimits, endOfScheduledDutyTime, endOfOperationalDutyTime, endOfFARDutyTime, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, domicile);

    const expectedDutyLimits = {
      scheduledDutyLimit: 13 * 60,
      operationalDutyLimit: 14 * 60,
      farDutyLimit: 16 * 60,
    };
    const expectedEndOfScheduledDutyTime = new Date('2021-09-01T23:45:00Z');
    const expectedEndOfOperationalDutyTime = new Date('2021-09-02T00:45:00Z');
    const expectedEndOfFARDutyTime = new Date('2021-09-02T02:45:00Z');

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(dutyLimits.value).toEqual(expectedDutyLimits);
    expect(endOfScheduledDutyTime.value).toEqual(expectedEndOfScheduledDutyTime);
    expect(endOfOperationalDutyTime.value).toEqual(expectedEndOfOperationalDutyTime);
    expect(endOfFARDutyTime.value).toEqual(expectedEndOfFARDutyTime);
  });

  it('day flight 1045Z MEM showtime with one optional (should be 0545 LBT I think)', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T10:45:00Z');
    const domicile = 'MEM';
    const options = { is2TripsWithOneOptional: true };
    const expectedLBT = 545;

    const { dutyLimits, endOfScheduledDutyTime, endOfOperationalDutyTime, endOfFARDutyTime, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, domicile, options);

    const expectedDutyLimits = {
      scheduledDutyLimit: 13.5 * 60,
      operationalDutyLimit: 15 * 60,
      farDutyLimit: 16 * 60,
    };
    const expectedEndOfScheduledDutyTime = new Date('2021-09-02T00:15:00Z');
    const expectedEndOfOperationalDutyTime = new Date('2021-09-02T01:45:00Z');
    const expectedEndOfFARDutyTime = new Date('2021-09-02T02:45:00Z');

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(dutyLimits.value).toEqual(expectedDutyLimits);
    expect(endOfScheduledDutyTime.value).toEqual(expectedEndOfScheduledDutyTime);
    expect(endOfOperationalDutyTime.value).toEqual(expectedEndOfOperationalDutyTime);
    expect(endOfFARDutyTime.value).toEqual(expectedEndOfFARDutyTime);
  });

  it('day flight 1800Z MEM showtime with 2 trips and one optional', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T18:00:00Z');
    const domicile = 'MEM';
    const options = { is2TripsWithOneOptional: true };
    const expectedLBT = 1300;

    const { dutyLimits, endOfScheduledDutyTime, endOfOperationalDutyTime, endOfFARDutyTime, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, domicile, options);

    const expectedDutyLimits = {
      scheduledDutyLimit: 13.5 * 60,
      operationalDutyLimit: 15 * 60,
      farDutyLimit: 16 * 60,
    };
    const expectedEndOfScheduledDutyTime = new Date('2021-09-02T07:30:00Z');
    const expectedEndOfOperationalDutyTime = new Date('2021-09-02T09:00:00Z');
    const expectedEndOfFARDutyTime = new Date('2021-09-02T10:00:00Z');

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(dutyLimits.value).toEqual(expectedDutyLimits);
    expect(endOfScheduledDutyTime.value).toEqual(expectedEndOfScheduledDutyTime);
    expect(endOfOperationalDutyTime.value).toEqual(expectedEndOfOperationalDutyTime);
    expect(endOfFARDutyTime.value).toEqual(expectedEndOfFARDutyTime);
  });

  it('night flight 0500Z IND showtime (should be 0000LBT I think)', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T05:00:00Z');
    const domicile = 'IND';
    const expectedLBT = 0;

    const { dutyLimits, endOfScheduledDutyTime, endOfOperationalDutyTime, endOfFARDutyTime, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, domicile);

    const expectedDutyLimits = {
      scheduledDutyLimit: 11.5 * 60,
      operationalDutyLimit: 13 * 60,
      farDutyLimit: 16 * 60,
    };
    const expectedEndOfScheduledDutyTime = new Date('2021-09-01T16:30:00Z');
    const expectedEndOfOperationalDutyTime = new Date('2021-09-01T18:00:00Z');
    const expectedEndOfFARDutyTime = new Date('2021-09-01T21:00:00Z');

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(dutyLimits.value).toEqual(expectedDutyLimits);
    expect(endOfScheduledDutyTime.value).toEqual(expectedEndOfScheduledDutyTime);
    expect(endOfOperationalDutyTime.value).toEqual(expectedEndOfOperationalDutyTime);
    expect(endOfFARDutyTime.value).toEqual(expectedEndOfFARDutyTime);
  });

  it('night flight 0500Z IND showtime with 2 trips and one optional (should be 0000LBT I think)', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T05:00:00Z');
    const domicile = 'IND';
    const options = { is2TripsWithOneOptional: true };
    const expectedLBT = 0;

    const { dutyLimits, endOfScheduledDutyTime, endOfOperationalDutyTime, endOfFARDutyTime, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, domicile, options);

    const expectedDutyLimits = {
      scheduledDutyLimit: 13 * 60,
      operationalDutyLimit: 14.5 * 60,
      farDutyLimit: 16 * 60,
    };
    const expectedEndOfScheduledDutyTime = new Date('2021-09-01T18:00:00Z');
    const expectedEndOfOperationalDutyTime = new Date('2021-09-01T19:30:00Z');
    const expectedEndOfFARDutyTime = new Date('2021-09-01T21:00:00Z');

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(dutyLimits.value).toEqual(expectedDutyLimits);
    expect(endOfScheduledDutyTime.value).toEqual(expectedEndOfScheduledDutyTime);
    expect(endOfOperationalDutyTime.value).toEqual(expectedEndOfOperationalDutyTime);
    expect(endOfFARDutyTime.value).toEqual(expectedEndOfFARDutyTime);
  });

  it('critical flight 1000Z OAK showtime (should be 0300LBT I think)', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T10:00:00Z');
    const domicile = 'OAK';
    const expectedLBT = 300;

    const { dutyLimits, endOfScheduledDutyTime, endOfOperationalDutyTime, endOfFARDutyTime, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, domicile);

    const expectedDutyLimits = {
      scheduledDutyLimit: 9 * 60,
      operationalDutyLimit: 10.5 * 60,
      farDutyLimit: 16 * 60,
    };
    const expectedEndOfScheduledDutyTime = new Date('2021-09-01T19:00:00Z');
    const expectedEndOfOperationalDutyTime = new Date('2021-09-01T20:30:00Z');
    const expectedEndOfFARDutyTime = new Date('2021-09-02T02:00:00Z');

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(dutyLimits.value).toEqual(expectedDutyLimits);
    expect(endOfScheduledDutyTime.value).toEqual(expectedEndOfScheduledDutyTime);
    expect(endOfOperationalDutyTime.value).toEqual(expectedEndOfOperationalDutyTime);
    expect(endOfFARDutyTime.value).toEqual(expectedEndOfFARDutyTime);
  });

  it('critical flight 1000Z OAK showtime with 2 trips and one optional (should be 0300LBT I think)', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T10:00:00Z');
    const domicile = 'OAK';
    const options = { is2TripsWithOneOptional: true };
    const expectedLBT = 300;

    const { dutyLimits, endOfScheduledDutyTime, endOfOperationalDutyTime, endOfFARDutyTime, dutyStartTimeLBT } = useDutyLimits(dutyStartTimeZulu, domicile, options);

    const expectedDutyLimits = {
      scheduledDutyLimit: 9 * 60,
      operationalDutyLimit: 10.5 * 60,
      farDutyLimit: 16 * 60,
    };
    const expectedEndOfScheduledDutyTime = new Date('2021-09-01T19:00:00Z');
    const expectedEndOfOperationalDutyTime = new Date('2021-09-01T20:30:00Z');
    const expectedEndOfFARDutyTime = new Date('2021-09-02T02:00:00Z');

    expect(dutyStartTimeLBT.value).toEqual(expectedLBT);
    expect(dutyLimits.value).toEqual(expectedDutyLimits);
    expect(endOfScheduledDutyTime.value).toEqual(expectedEndOfScheduledDutyTime);
    expect(endOfOperationalDutyTime.value).toEqual(expectedEndOfOperationalDutyTime);
    expect(endOfFARDutyTime.value).toEqual(expectedEndOfFARDutyTime);
  });
});
