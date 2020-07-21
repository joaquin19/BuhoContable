import React, { Component } from 'react'
import Filter from './Filter'
import Button from './Button'
import { typeActions } from '../../../types';
import 'react-select2-wrapper/css/select2.css'
interface Props extends React.Props<index> {
    actions: Array<typeActions>;
}


export default class index extends Component<Props> {
    render() {
        const { actions } = this.props;
        const last = actions.length - 1;
        const filter = actions.find(action => action.type === 'Filter');
        return (
            <div id="panel-1" className="panel panel-collapsed col-12">
                <div className="panel-hdr text-success">
                    <div className="panel-toolbar">
                        {actions.map((action, key) => {
                            switch (action.type) {
                                case 'Button':
                                    return (
                                        <Button key={key} last={last === key} type={action.type} data={action.data} label={action.label} />
                                    );
                                case 'Switch':
                                    return (
                                        <Button key={key} last={last === key} type={action.type} data={action.data} />
                                    );
                                case 'DropDown':
                                    return (
                                        <Button key={key} last={last === key} type={action.type} dataDropDown={action.dataDropDown} />
                                    );
                                case 'Filter':
                                    return (
                                        <Button key={key} last={last === key} type={action.type} />
                                    );
                                default: return ''
                            }
                        })}

                    </div>
                </div>
                <div className="panel-container collapse">
                    <div className="panel-content">
                        {filter ? <Filter fields={filter.fields} onClick={filter.onClick} initialValues={filter.initialValues ? filter.initialValues : {}} /> : null}
                    </div>
                </div>
            </div>
        )
    }
}
