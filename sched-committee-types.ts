export interface DutyLimitOptions {
  isDayRoomScheduledAndReserved?: boolean
  is2Trips?: boolean
  is2TripsWithOneOptional?: boolean // TODO: list examples here
  isInternational?: boolean
  isGrid?: boolean // "grid" means the trip starts more than 96 hours from now
  isInboundFlightSegmentGreaterThan5Hours?: boolean
  crewNumberOfPilots?: number
  layoverLength?: number
}
