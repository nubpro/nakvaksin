export interface VaxStatusType {
    timestamp?: string | null;
    headerText: HeaderTextOrText;
    state: string;
    data?: (DataEntityOrActionEntity | null)[] | null;
    action?: (DataEntityOrActionEntity | null)[] | null;
}

interface HeaderTextOrText {
    ms_MY: string;
    en_US: string;
}

export interface DataEntityOrActionEntity {
    text: HeaderTextOrText;
    value: string;
}

