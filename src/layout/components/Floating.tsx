import React, { Component } from 'react'

interface Props extends React.Props<Floating> {
    logout: () => void;
}

export default class Floating extends Component<Props> {
    render() {
        const {logout} = this.props;
        return (
        <nav className="shortcut-menu d-none d-sm-block">
            <input type="checkbox" className="menu-open" name="menu-open" id="menu_open" />
            <label htmlFor="menu_open" className="menu-open-button ">
                <span className="app-shortcut-icon d-block" />
            </label>
            <button onClick={() => {}} className="menu-item btn" data-toggle="tooltip" data-placement="left" title="Scroll Top">
                <i className="fal fa-arrow-up" />
            </button>
            <button onClick={logout} className="menu-item btn" data-toggle="tooltip" data-placement="left" title="Logout">
                <i className="fal fa-sign-out" />
            </button>
            <button onClick={() => {}} className="menu-item btn" data-action="app-fullscreen" data-toggle="tooltip" data-placement="left"
                title="Full Screen">
                <i className="fal fa-expand" />
            </button>
            <button onClick={() => {}} className="menu-item btn" data-action="app-print" data-toggle="tooltip" data-placement="left"
                title="Print page">
                <i className="fal fa-print" />
            </button>
            <button onClick={() => {}} className="menu-item btn" data-action="app-voice" data-toggle="tooltip" data-placement="left"
                title="Voice command">
                <i className="fal fa-microphone" />
            </button>
        </nav>
        )
    }
}
