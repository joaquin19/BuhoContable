export interface dataPagination {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    firstRowOnPage: number;
    lastRowOnPage: number;
    pagedTypes: Array<number>;
}

export interface actionsTable {
    action: () => void;
    icon: string;
    text: string;
}


// Interfaces Component Actions

export interface dataActions {
    title?: string;
    icon?: string;
    text?: string;
    isActive?: boolean;
    last?: boolean;
    onClick: () => void;
}

export interface field{
    className?: string;
    field: string;
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    options?: Array<any>;
    change?: boolean;
    onChange?: (data) => void;
}

export interface typeActions {
    type: string;
    data?: dataActions;
    dataDropDown?: Array<dataActions>;
    fields?: Array<field>;
    onClick?: (data) => void;
}