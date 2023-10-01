interface DutyLimitOptions {
  isDayRoomScheduledAndReserved?: boolean
  is2Trips?: boolean
  is2TripsWithOneOptional?: boolean // TODO: list examples here
  isInternational?: boolean
  isGrid?: boolean // "grid" means the trip starts more than 96 hours from now
  isInboundFlightSegmentGreaterThan5Hours?: boolean
  crewNumberOfPilots?: number
  layoverLength?: number
}

export function useUseDutyLimits(dutyStartTime: Date, options: DutyLimitOptions) {
  const scheduledDutyLimit = computed(() => {
    if (!options.isInternational)
      return new Date(dutyStartTime)

    return new Date()
  })
  const operationalDutyLimit = computed(() => new Date(dutyStartTime))
  const farDutyLimit = computed(() => new Date(dutyStartTime))

  return { scheduledDutyLimit, operationalDutyLimit, farDutyLimit }
}
