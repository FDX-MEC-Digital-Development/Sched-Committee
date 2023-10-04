export type Domicile = 'MEM' | 'IND' | 'OAK' | 'LAX' | 'ANC' | 'CGN';

export interface DutyLimitOptions {
  isDayRoomScheduledAndReserved?: boolean
  is2Trips?: boolean
  is2TripsWithOneOptional?: boolean // TODO: list examples here
  isInternational?: boolean
  isGrid?: boolean // "grid" means the trip starts more than 96 hours from now
  isInboundFlightSegmentGreaterThan5HoursTZD?: boolean
  crewNumberOfPilots?: number
  layoverLength?: number,
  domicile?: Domicile
}

export interface DomesticDutyLimit {

    // duty limit in number of minutes
    scheduled: number;
    operational: number;
    far: number;

    endOfScheduledDutyDate: Date;
    endOfOperationalDutyDate: Date;
    endOfFARDutyDate: Date;
}

export interface InternationalDutyLimit {
    scheduled: number;
    operational: number;

    landings: number;
    blockHours: number;

    endOfScheduledDutyDate: Date;
    endOfOperationalDutyDate: Date;
}

export interface DutyLimitsDeprecated {
  scheduledDutyLimit: number,
  operationalDutyLimit: number,
  farDutyLimit: number,
}

export interface DutyLimits {
  domestic: Ref<DomesticDutyLimit>,
  dutyStartTimeLBT: Ref<number>;

};
