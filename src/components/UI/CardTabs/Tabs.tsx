import React, { Component } from 'react'


interface Props extends React.Props<Tabs> {
    data: Array<any>;
}

export default class Tabs extends Component<Props> {
    render() {
        const {data} = this.props;
        return (
            <ul className="nav nav-tabs border-bottom-0 nav-tabs-clean" role="tablist">
                {
                    data.map((tab, key) => {
                        if(tab.type !== null && tab.type === 'dropdown') {
                            return (
                                <li key={`li-tab-${key}`} className="nav-item dropdown">
                                    <a 
                                        className={`nav-link dropdown-toggle ${tab.active}`}
                                        data-toggle="dropdown"
                                        role="button" 
                                        href=""
                                        aria-haspopup="true" 
                                        aria-expanded="false">
                                            {tab.name}
                                    </a>
                                    <div className="dropdown-menu" style={{position: "absolute", top: "37px", left: "0px", willChange: "top, left"}}>
                                        {
                                            tab.tabs.map((tb, key) => (
                                                <a key={`subTab-${key}`} href="" className={`dropdown-item`} onClick={tb.onClick} data-toggle="dropdown" role="tab">{tb.name}</a>
                                            ))
                                        }
                                    </div>
                                </li>
                            )
                        } else {
                            return (
                                <li key={`li-tab-${key}`} className="nav-item">
                                    <a className={`nav-link ${tab.active}`} href="" data-toggle="tab" onClick={tab.onClick} role="tab">
                                        {tab.name}
                                    </a>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        )
    }
}
