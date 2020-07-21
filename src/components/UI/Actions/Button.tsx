import React, { Component } from 'react'

import { dataActions } from '../../types'


const NormalButton = ({ title, icon, onClick, last }: dataActions) => {
    return (
        <button className={`btn btn-primary ${last ? '' : 'mr-3'} mt-2 mb-2`} onClick={onClick} title={title}>
            <i className={`fas ${icon}`}></i>
        </button>
    )
}

const SwitchButton = ({ text, isActive, onClick, last }: dataActions) => {
    return (
        <button className={`btn btn-primary ${last ? '' : 'mr-3'} mt-2 mb-2`} onClick={onClick} title={text}>
            <i className={`fas ${isActive ? 'fa-toggle-on' : 'fa-toggle-off'}`}></i> {text}
        </button>
    )
}

const FilterButton = ({ last }) => {
    return (
        <button className={`btn btn-primary ${last ? '' : 'mr-3'} mt-2 mb-2`} data-action="panel-collapse" data-toggle="tooltip" data-original-title="Collapse" title='Filter'>
            <i className='fas fa-filter'></i>
        </button>
    )
}

const DropDownButton = (props: any) => {
    const { dataDropDown } = props;
    return (
        <div className="btn-group m-5">
            <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fas fa-tasks"></i>
            </button>
            <div className="dropdown-menu">
                {dataDropDown.map((action: dataActions, key: number) => (
                    <a key={key} className="dropdown-item" onClick={action.onClick} href='/#'>
                        {action.icon ?
                            <i style={{ fontSize: '25px', marginRight: '10px' }} className={`fas ${action.icon}`}></i>
                            : null
                        }
                        {action.text}
                    </a>
                ))}
            </div>
        </div>
    )
}


interface Props extends React.Props<Button> {
    type: string;
    last: boolean;
    data?: dataActions;
    dataDropDown?: Array<dataActions>;
    label?: string
}


export default class Button extends Component<Props> {
    render() {
        const { type, data, dataDropDown, label, last } = this.props;
        return (
            type === 'Button' ? 
                <NormalButton {...data} last={last} {...label} /> : 
            type === 'Switch' ? 
                <SwitchButton {...data} last={last} /> : 
            type === 'Filter' ?
                <FilterButton last={last} /> :
                <DropDownButton dataDropDown={dataDropDown} />
        )
    }
}
