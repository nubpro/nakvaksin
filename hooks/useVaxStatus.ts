import { DateTime } from 'luxon';
import { useQuery } from 'react-query';

import { axInstance } from '../apis/nakvaksin.instance';
import { VaxStatus, VaxStatusElem } from '../types/vaxStatus';

const QK_VAXSTATUS = 'vax_status';

async function getVaxStatus() {
    const { data: rawData } = await axInstance({
        method: 'GET',
        url: '/vac-status'
    });

    return {
        firstDoseAppointment: getFirstDoseAppt(rawData),
        secondDoseAppointment: getSecondDoseAppt(rawData),
        rawData
    };
}

const useVaxStatus = () => {
    return useQuery<VaxStatus>(QK_VAXSTATUS, getVaxStatus, {
        staleTime: 1000 * 86400, // 1 days
        retry: 1
    });
};

function getFirstDoseAppt(rawData: VaxStatusElem[]) {
    return rawData.find((elem) => elem.headerText.en_US === '1st Dose appointment');
}

function getSecondDoseAppt(rawData: VaxStatusElem[]) {
    return rawData.find((elem) => elem.headerText.en_US === '2nd Dose appointment');
}

function getHealthFacility(vaxStatus: VaxStatusElem) {
    return vaxStatus.data?.find((d) => d?.text.en_US.toUpperCase().includes('HEALTH FACILITY'))
        ?.value;
}

function getVaccinationLocation(vaxStatus: VaxStatusElem) {
    return vaxStatus.data?.find((d) => d?.text.en_US.toUpperCase().includes('VACCINATION LOCATION'))
        ?.value;
}

function getApptDate(vaxStatus: VaxStatusElem) {
    return vaxStatus.data?.find((el) => el?.text.en_US.toUpperCase().includes('DATE'))?.value; // eg: 26-06-2021
}

function getApptTime(vaxStatus: VaxStatusElem) {
    return vaxStatus.data?.find((el) => el?.text.en_US.toUpperCase().includes('TIME'))?.value;
}

function getApptDateTime(vaxStatus: VaxStatusElem) {
    const date = getApptDate(vaxStatus); // eg: 26-06-2021
    const _date = date ? DateTime.fromFormat(date, 'dd-MM-yyyy') : undefined;

    // NOTE:
    // The MySejahtera API is not returning the AM / PM consistently,
    // hence I will only display what the API is returning without
    // any additional process to prevent mistakes
    // eg: 08:00, 08:00AM
    const time = getApptTime(vaxStatus);

    return {
        date,
        _date,
        time
    };
}

export { getApptDateTime, getHealthFacility, getVaccinationLocation, QK_VAXSTATUS, useVaxStatus };
