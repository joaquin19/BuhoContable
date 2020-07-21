import Image from 'react'

export interface targetType {
    to: string;
    icon: string;
    name: string;
    access: boolean;
}

export interface menuType {
    name: string;
    icon: string;
    targets: Array<targetType>;
}

export interface userType {
    avatar: any;
    name:string;
    type:string;
}

export interface breadcrumbType {
    name: string;
    target: string;
    active?: boolean;
}