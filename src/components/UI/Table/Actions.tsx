import React, { Component } from 'react'
import {actionsTable} from '../../types'

interface Props extends React.Props<Actions> {
    actions: Array<actionsTable>;
}

export default class Actions extends Component<Props> {
    render() {
        const {actions} = this.props;
        return (
            <td>
                <div className="btn-group dropleft" style={{width: '60px'}}>
                    <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-tasks"></i>
                    </button>
                    <div className="dropdown-menu fadeinright">
                        {actions.map((action, key) => (
                            <button key={key} className="dropdown-item" onClick={action.action}>
                                {action.icon ?
                                    <i style={{ fontSize: '25px', marginRight: '10px' }} className={`fas ${action.icon}`}></i>
                                    : null
                                }
                                {action.text}
                            </button>
                        ))}
                    </div>
                </div>
            </td>
        )
    }
}
