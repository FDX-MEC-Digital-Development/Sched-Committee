import { describe, expect, it } from 'vitest';
import { setup } from '@nuxt/test-utils';

import { ref } from 'vue';
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
    const options = ref<RestOptions>({
      isInternational: false,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 49,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    });

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

  // pairing construction < 48 hours prior to showtime
  it('pairing construction < 48 hours prior to showtime', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: false,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 47,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 9 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // exceptions
  // operating in critical period
  it('operating in critical period', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: false,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: { ...defaultDomesticRestOptions, operatingInCriticalPeriod: true },
      minutesPairingConstructedPriorToShowtime: 60 * 49,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 12 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // hotel standby scenario
  it('hotel standby scenario', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: false,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: { ...defaultDomesticRestOptions, hotelStbyScenario: true },
      minutesPairingConstructedPriorToShowtime: 60 * 49,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 12 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // prior to exceeding 8 in 24
  it('prior to exceeding 8 in 24', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: false,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: { ...defaultDomesticRestOptions, priorToExceed8BlockHoursIn24Hours: true },
      minutesPairingConstructedPriorToShowtime: 60 * 49,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 9 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // after exceeding 8 in 24
  it('after exceeding 8 in 24', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: false,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: { ...defaultDomesticRestOptions, afterExceed8BlockHoursIn24Hours: true },
      minutesPairingConstructedPriorToShowtime: 60 * 49,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 17 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // exception 12.C.2.D - prior to exceeding 735 actual block hours
  it('exception 12.C.2.D', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: false,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: { ...defaultDomesticRestOptions, exception12C2dPriorToExceeding735ActualBlockHours: true },
      minutesPairingConstructedPriorToShowtime: 60 * 49,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 10 * 60 + 15;
    const expectedOperational = 9 * 60 + 15;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
    expect(restMinutesOperationallyReducableTo.value).toEqual(expectedOperational);
  });

  // exception 12.C.2.D - after exceeding 735 actual block hours
  it('exception 12.C.2.D - after exceeding 735 actual block hours', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: false,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: { ...defaultDomesticRestOptions, exception12C2dAfterExceeding735ActualBlockHours: true },
      minutesPairingConstructedPriorToShowtime: 60 * 49,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 13 * 60;
    const expectedOperational = 12 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
    expect(restMinutesOperationallyReducableTo.value).toEqual(expectedOperational);
  });
});

describe('test international rest', () => {
  // tests

  // pairing construction > 96 hours prior to showtime
  it('pairing construction > 96 hours prior to showtime', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: true,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 97,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    });

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

  // pairing construction > 96 hours prior to showtime, previous duty revenue, next duty revenue
  it('pairing construction > 96 hours prior to showtime, previous duty revenue, next duty revenue', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: true,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 97,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 14 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // pairing construction > 96 hours prior to showtime, previous duty revenue, next duty deadhead
  it('pairing construction > 96 hours prior to showtime, previous duty revenue, next duty deadhead', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: true,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 97,
      nextDuty: 'Deadhead',
      prevDuty: 'Revenue',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 14 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // pairing construction > 96 hours prior to showtime, previous duty revenue, next duty hotel standby
  it('pairing construction > 96 hours prior to showtime, previous duty revenue, next duty hotel standby', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: true,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 97,
      nextDuty: 'HotelStby',
      prevDuty: 'Revenue',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 12 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // pairing construction > 96 hours prior to showtime, previous duty revenue, next duty hotel standby
  it('pairing construction > 96 hours prior to showtime, previous duty revenue, next duty hotel standby', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: true,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 97,
      nextDuty: 'HotelStby',
      prevDuty: 'Revenue',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 12 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // pairing construction > 96 hours prior to showtime, previous duty deadhead, next duty revenue
  it('pairing construction > 96 hours prior to showtime, previous duty deadhead, next duty revenue', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: true,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 97,
      nextDuty: 'Revenue',
      prevDuty: 'Deadhead',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 12 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // pairing construction > 96 hours prior to showtime, previous duty deadhead, next duty deadhead
  it('pairing construction > 96 hours prior to showtime, previous duty deadhead, next duty deadhead', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: true,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 97,
      nextDuty: 'Deadhead',
      prevDuty: 'Deadhead',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 12 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // pairing construction > 96 hours prior to showtime, previous duty deadhead, next duty hotel standby
  it('pairing construction > 96 hours prior to showtime, previous duty deadhead, next duty hotel standby', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: true,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 97,
      nextDuty: 'HotelStby',
      prevDuty: 'Deadhead',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 12 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // pairing construction > 96 hours prior to showtime, previous duty hotel standby, next duty revenue
  it('pairing construction > 96 hours prior to showtime, previous duty hotel standby, next duty revenue', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: true,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 97,
      nextDuty: 'Revenue',
      prevDuty: 'HotelStby',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 12 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // pairing construction > 96 hours prior to showtime, previous duty hotel standby, next duty deadhead
  it('pairing construction > 96 hours prior to showtime, previous duty hotel standby, next duty deadhead', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: true,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 97,
      nextDuty: 'Deadhead',
      prevDuty: 'HotelStby',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 12 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // pairing construction > 96 hours prior to showtime, previous duty hotel standby, next duty hotel standby
  it('pairing construction > 96 hours prior to showtime, previous duty hotel standby, next duty hotel standby', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: true,
      internationalOptions: defaultInternationalRestOptions,
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 97,
      nextDuty: 'HotelStby',
      prevDuty: 'HotelStby',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 12 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });

  // double crew
  it('double crew', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: true,
      internationalOptions: { ...defaultInternationalRestOptions, doubleCrew: true },
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 95,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 17 * 60;
    const expectedOperational = 16 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
    expect(restMinutesOperationallyReducableTo.value).toEqual(expectedOperational);
  });

  // will exceed 8 block hours or 12 hours on duty
  it('will exceed 8 block hours or 12 hours on duty', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: true,
      internationalOptions: { ...defaultInternationalRestOptions, willExceed8BlockHoursOr12HoursOnDuty: true },
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 95,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 17 * 60;
    const expectedOperational = 16 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
    expect(restMinutesOperationallyReducableTo.value).toEqual(expectedOperational);
  });

  // late arrivals
  it('late arrivals', () => {
    const dutyEndTimeZulu = new Date('2021-09-01T18:00:00Z');
    const options = ref<RestOptions>({
      isInternational: true,
      internationalOptions: { ...defaultInternationalRestOptions, lateArrival: true },
      domesticOptions: defaultDomesticRestOptions,
      minutesPairingConstructedPriorToShowtime: 60 * 95,
      nextDuty: 'Revenue',
      prevDuty: 'Revenue',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { restMinutesRequiredScheduled, restMinutesOperationallyReducableTo, restEndTimeZulu, notes, cbaLink } = useRestRecover(dutyEndTimeZulu, options);

    const expectedScheduled = 12 * 60;

    expect(restMinutesRequiredScheduled.value).toEqual(expectedScheduled);
  });
});
