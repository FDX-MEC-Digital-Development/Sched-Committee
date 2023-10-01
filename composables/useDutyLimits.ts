import { addHours } from 'date-fns';
import type { DutyLimitOptions } from '~/sched-committee-types';

export function useUseDutyLimits(dutyStartTime: Date, options: DutyLimitOptions) {
  const scheduledDutyLimit = computed(() => {
    const scheduledDutyLimit = addHours(dutyStartTime, 14);
    if (!options.isInternational)
      return scheduledDutyLimit;

    return new Date();
  });
  const operationalDutyLimit = computed(() => new Date(dutyStartTime));
  const farDutyLimit = computed(() => new Date(dutyStartTime));

  return { scheduledDutyLimit, operationalDutyLimit, farDutyLimit };
}
