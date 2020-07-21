import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { userType, menuType } from '../types'
import { connect } from 'react-redux';
import { actionsReducers } from '../../reducers';

interface Props {
    title: string;
    logo: any;
    user: userType;
    menu: Array<menuType>;
    getResetPage: () => void;
}

class Sidebar extends Component<Props, {}> {
    render() {
        const { title, logo, user, menu } = this.props;
        return (
            <aside className="page-sidebar">
                <div className="page-logo">
                    <Link to='' className="page-logo-link press-scale-down d-flex align-items-center position-relative" data-toggle="modal" data-target="#modal-shortcut">
                        <img src={logo} alt="SmartAdmin WebApp" aria-roledescription="logo" />
                        <span className="page-logo-text mr-1">{title}</span>
                        <span className="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
                        <i className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
                    </Link>
                </div>
                <nav id="js-primary-nav" className="primary-nav" role="navigation">
                    <div className="nav-filter">
                        <div className="position-relative">
                            <input type="text" id="nav_filter_input" placeholder="Filter menu" className="form-control" tabIndex={0} />
                            <Link to='' className="btn-primary btn-search-close js-waves-off" data-action="toggle" data-class="list-filter-active" data-target=".page-sidebar">
                                <i className="fal fa-chevron-up"></i>
                            </Link>
                        </div>
                    </div>
                    <div className="info-card">
                        <img src={require("../assets/img/avatar-admin.png")} className="profile-image rounded-circle" alt="Dr. Codex Lantern" />
                        <div className="info-card-text">
                            <Link to='' className="d-flex align-items-center text-white">
                                <span className="text-truncate text-truncate-sm d-inline-block">
                                    {user.name}
                                </span>
                            </Link>
                            <span className="d-inline-block text-truncate text-truncate-sm">{user.type}</span>
                        </div>
                        <img src={require("../assets/img/cover-2-lg.png")} className="cover" alt="cover" />
                        <Link to='' className="pull-trigger-btn" data-action="toggle" data-class="list-filter-active" data-target=".page-sidebar" data-focus="nav_filter_input">
                            <i className="fal fa-angle-down"></i>
                        </Link>
                    </div>
                    <ul id="js-nav-menu" className="nav-menu">
                        <li className="Dashboard">
                            <Link to='/' data-class="active" data-target='.Dashboard' title='Dasboard' data-filter-tags='Dashboard'>
                                <i className={`fas fa-home`}></i>
                                <span className="nav-link-text" data-i18n='nav.Dashboard'>Dashboard</span>
                            </Link>
                        </li>

                        {menu.map((m, key) => (
                            <li key={`menu-${key}`} id={m.name.replace(' ', '_')}>
                                <Link to='' data-action="toggle" data-class="active open" data-target={`#${m.name.replace(' ', '_')}`} data-focus={m.name.replace(' ', '_')} title={m.name} data-filter-tags={m.name}>
                                    <i className={`fas ${m.icon}`}></i>
                                    <span className="nav-link-text" data-i18n={`nav.${m.name.replace(' ', '_')}`}>{m.name}</span>
                                </Link>
                                <ul>
                                    {m.targets.map((target, key) => (
                                        <li key={`sub-menu-${key}`} id={target.name.replace(' ', '_')}>
                                            <Link
                                                replace
                                                to={target.to}
                                                onClick={() => this.props.getResetPage()}
                                                data-class="active open"
                                                data-target={`#${target.name.replace(' ', '_')}`}
                                                data-focus={`#${target.name.replace(' ', '_')}`}
                                                title={target.name}
                                                data-filter-tags={`${m.name} ${target.name}`} >
                                                <i className={`fas ${target.icon}`} />
                                                <span
                                                    className="nav-link-text"
                                                    data-i18n={`nav.${m.name.replace(' ', '_')}_${target.name.replace(' ', '_')}`}>
                                                    {target.name}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                    <div className="filter-message js-filter-message bg-success-600"></div>
                </nav>
                <div className="nav-footer shadow-top">
                    <a href='/#' data-action="toggle" data-class="nav-function-minify" className="hidden-md-down">
                        <i className="ni ni-chevron-right"></i>
                        <i className="ni ni-chevron-right"></i>
                    </a>
                    <ul className="list-table m-auto nav-footer-buttons">
                        <li>
                            <a href='/#' data-toggle="tooltip" data-placement="top" title="Chat logs" >
                                <i className="fal fa-comments"></i>
                            </a>
                        </li>
                        <li>
                            <a href='/#' data-toggle="tooltip" data-placement="top" title="Support Chat" >
                                <i className="fal fa-life-ring"></i>
                            </a>
                        </li>
                        <li>
                            <a href='/#' data-toggle="tooltip" data-placement="top" title="Make a call">
                                <i className="fal fa-phone"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    getResetPage: () => {
        dispatch({ type: actionsReducers.RESET_PAGINATION });
    },
});

export default connect(null, mapDispatchToProps)(Sidebar)
