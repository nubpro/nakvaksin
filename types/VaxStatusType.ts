export interface VaxStatusType {
    timestamp?: string | null;
    headerText: HeaderTextOrText;
    state: string;
    data?: (DataEntityOrActionEntity | null)[] | null;
    action?: (DataEntityOrActionEntity1 | null)[] | null;
}

interface HeaderTextOrText {
    ms_MY: string;
    en_US: string;
}

interface DataEntityOrActionEntity {
    text: HeaderTextOrText;
    value: string;
}

interface DataEntityOrActionEntity1 {
    text: HeaderTextOrText;
    value: string;
}
