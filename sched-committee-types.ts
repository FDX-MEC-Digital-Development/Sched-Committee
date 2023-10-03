export interface DutyLimitOptions {
  isDayRoomScheduledAndReserved?: boolean
  is2Trips?: boolean
  is2TripsWithOneOptional?: boolean // TODO: list examples here
  isInternational?: boolean
  isGrid?: boolean // "grid" means the trip starts more than 96 hours from now
  isInboundFlightSegmentGreaterThan5HoursTZD?: boolean
  crewNumberOfPilots?: number
  layoverLength?: number
}

export interface DutyLimits {
  scheduledDutyLimit: number,
  operationalDutyLimit: number,
  farDutyLimit: number,
}

export interface DomesticDutyLimit {
  dutyLimits: Ref<DutyLimits>;
  scheduledDutyLimit: Ref<number>;
  operationalDutyLimit: Ref<number>;
  farDutyLimit: Ref<number>;
  endOfScheduledDutyTime: Ref<Date>;
  endOfOperationalDutyTime: Ref<Date>;
  endOfFARDutyTime: Ref<Date>;
  dutyStartTimeLBT: Ref<number>;
};

export type Domicile = 'MEM' | 'IND' | 'OAK' | 'LAX' | 'ANC' | 'CGN';
