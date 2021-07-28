import { useQuery } from 'react-query';

import { axInstance } from '../apis/nakvaksin.instance';
import { DataEntityOrActionEntity, VaxStatusType } from '../types/VaxStatusType';

const QK_VAXSTATUS = 'vax_status';

async function getVaxStatus() {
    const { data } = await axInstance({
        method: 'GET',
        url: '/vac-status'
    });

    return data;
}

const useVaxStatus = () => {
    const { data } = useQuery<VaxStatusType>(QK_VAXSTATUS, getVaxStatus, {
        staleTime: 1000 * 86400, // 1 days
        retry: 1
    });

    return { data };
};

function getFirstDoseStatus(input: VaxStatusType[] | undefined) {
    if (input == undefined) {
        return;
    }

    return input.filter((input) => input.headerText.en_US === '1st Dose appointment')[0];
}

function getSecondDoseStatus(input: VaxStatusType[] | undefined) {
    if (input == undefined) {
        return;
    }

    return input.filter((input) => input.headerText.en_US === '2nd Dose appointment')[0];
}

function getHealthFacility(input: (DataEntityOrActionEntity | null)[] | null | undefined) {
    return input?.filter((input) => input?.text.en_US === 'Health Facility:')[0]?.value;
}

function getVaccinationLocation(input: (DataEntityOrActionEntity | null)[] | null | undefined) {
    return input?.filter((input) => input?.text.en_US === 'Vaccination Location:')[0]?.value;
}

export {
    getFirstDoseStatus,
    getHealthFacility,
    getSecondDoseStatus,
    getVaccinationLocation,
    useVaxStatus
};
