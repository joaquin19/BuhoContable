/**
 * Here we handle constant values that can be used in different
 * files of the entire application and will always be the same
 */

export interface dataPagination {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    firstRowOnPage: number;
    lastRowOnPage: number;
    initialValues?: any;
    pagedTypes: Array<number>;
}

export interface typeActions {
    type: string;
    data?: dataActions;
    label?: string;
    dataDropDown?: Array<dataActions>;
    fields?: Array<field>;
    initialValues?: any;
    onClick?: (data) => void;
}
export interface dataActions {
    title?: string;
    icon?: string;
    text?: string;
    isActive?: boolean;
    initialValues?: any;
    onClick: () => void;
}

export interface field{
    field: string;
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    options?: Array<any>;
    initialValues?: any;
}