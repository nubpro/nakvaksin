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

function getApptDate(vaxStatus: VaxStatusElem) {
    const date = vaxStatus.data
        ?.find((el) => el?.text.en_US.toUpperCase().includes('DATE:'))
        ?.value.split('-');
    const [day, month, year] = [date?.[0], date?.[1], date?.[2]];
    const time = vaxStatus.data?.find((el) => el?.text.en_US.toUpperCase().includes('TIME:'));
    return new Date(`${year}-${month}-${day} ${time?.value}`);
}

function formatApptDate(date: Date) {
    const dayName = date.toLocaleString('en-us', { weekday: 'long' });
    const month = date.toLocaleString('default', { month: 'short' });
    const [day, year] = [date.getDate(), date.getFullYear()];
    const [hour, minutes] = [date.getHours(), date.getMinutes()];
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${dayName}, ${day} ${month} ${year}, ${hour}:${minutes} ${ampm}`;
}

export { formatApptDate, getApptDate, getHealthFacility, getVaccinationLocation, useVaxStatus };
