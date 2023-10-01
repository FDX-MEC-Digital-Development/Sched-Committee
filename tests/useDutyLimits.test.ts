import { describe, expect, it } from 'vitest';
import { $fetch, setup } from '@nuxt/test-utils';
import { useDutyLimits } from '../composables/useDutyLimits';

// npm run test

describe('test duty limit logic', async () => {
  await setup({
    server: false, // ssr: false

    build: false, // false if browser or server is disabled)
  });

  it('day flight 1800Z MEM showtime', () => {
    const dutyStartTimeZulu = new Date('2021-09-01T18:00:00Z');
    const domicile = 'MEM';

    const { dutyLimits, endOfScheduledDutyTime, endOfOperationalDutyTime, endOfFARDutyTime } = useDutyLimits(dutyStartTimeZulu, domicile);

    const expectedDutyLimits = [13 * 60, 14.5 * 60, 16 * 60];
    const expectedEndOfScheduledDutyTime = new Date('2021-09-02T07:00:00Z');
    const expectedEndOfOperationalDutyTime = new Date('2021-09-02T08:30:00Z');
    const expectedEndOfFARDutyTime = new Date('2021-09-02T10:00:00Z');

    expect(dutyLimits.value).toEqual(expectedDutyLimits);
    expect(endOfScheduledDutyTime.value).toEqual(expectedEndOfScheduledDutyTime);
    expect(endOfOperationalDutyTime.value).toEqual(expectedEndOfOperationalDutyTime);
    expect(endOfFARDutyTime.value).toEqual(expectedEndOfFARDutyTime);
  });
});
