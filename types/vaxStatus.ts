export interface VaxStatus {
    firstDoseAppointment: VaxStatusElem | undefined;
    secondDoseAppointment: VaxStatusElem | undefined;
    rawData: VaxStatusElem[];
}

export interface VaxStatusElem {
    timestamp?: string | null;
    headerText: HeaderTextOrText;
    state: VaxElemState;
    data?: (DataEntityOrActionEntity | null)[] | null;
    action?: (DataEntityOrActionEntity | null)[] | null;
}

export enum VaxElemState {
    PENDING = 'PENDING',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

interface HeaderTextOrText {
    ms_MY: string;
    en_US: string;
}

export interface DataEntityOrActionEntity {
    text: HeaderTextOrText;
    value: string;
}
