import { useQuery } from 'react-query';

import { axInstance } from '../apis/nakvaksin.instance';
import { VaxStatus, VaxStatusElem } from '../types/VaxStatus';

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
    return vaxStatus.data
        ?.find((d) => d?.text.en_US.toUpperCase().includes('HEALTH FACILITY'))
        ?.value.toUpperCase();
}

function getVaccinationLocation(vaxStatus: VaxStatusElem) {
    return vaxStatus.data
        ?.find((d) => d?.text.en_US.toUpperCase().includes('VACCINATION LOCATION'))
        ?.value.toUpperCase();
}

export { getHealthFacility, getVaccinationLocation, useVaxStatus };
