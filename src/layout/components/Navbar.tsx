import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { userType } from '../types'

interface Props {
	title: string;
	logo: any;
	user: userType;
	logout: () => void;
}

export default class Navbar extends Component<Props, {}> {
	render() {
		const { user, logo, title, logout } = this.props;
		return (
			<header className="page-header" style={{ backgroundColor: 'white' }} role="banner">
				<div className="page-logo">
					<Link to='' className="page-logo-link press-scale-down d-flex align-items-center position-relative"
						data-toggle="modal" data-target="#modal-shortcut">
						<img src={logo} alt="SmartAdmin WebApp" aria-roledescription="logo" />
						<span className="page-logo-text mr-1">{title}</span>
						<span className="position-absolute text-white opacity-50 small pos-top pos-right mr-2 mt-n2"></span>
						<i className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
					</Link>
				</div>
				<div className="hidden-md-down dropdown-icon-menu position-relative">
					<Link to='' className="header-btn btn js-waves-off" data-action="toggle"
						data-class="nav-function-hidden" title="Hide Navigation">
						<i className="ni ni-menu" />
					</Link>
					<ul>
						<li>
							<Link to='' className="btn js-waves-off" data-action="toggle"
								data-class="nav-function-minify" title="Minify Navigation">
								<i className="ni ni-minify-nav" />
							</Link>
						</li>
						<li>
							<Link to='' className="btn js-waves-off" data-action="toggle"
								data-class="nav-function-fixed" title="Lock Navigation">
								<i className="ni ni-lock-nav" />
							</Link>
						</li>
					</ul>
				</div>
				<div className="ml-auto d-flex">
					<div>
						<Link to='' data-toggle="dropdown" title="drlantern@gotbootstrap.com"
							className="header-icon d-flex align-items-center justify-content-center ml-2">
							<img src={require("../assets/img/avatar-admin.png")}
								className="profile-image rounded-circle" alt="Dr. Codex Lantern" />
						</Link>
						<div className="dropdown-menu dropdown-menu-animated dropdown-lg">
							<div className="dropdown-header bg-trans-gradient d-flex flex-row py-4 rounded-top">
								<div className="d-flex flex-row align-items-center mt-1 mb-1 color-white">
									<span className="mr-2">
										<img src={require("../assets/img/avatar-admin.png")}
											className="rounded-circle profile-image" alt="Dr. Codex Lantern" />
									</span>
									<div className="info-card-text text-white">
										<div className="fs-lg text-truncate text-truncate-lg">{user.name}</div>
									</div>
								</div>
							</div>
							<div className="dropdown-divider m-0"></div>
							<div className="dropdown-divider m-0"></div>
							<button onClick={logout} className="dropdown-item fw-500 pt-3 pb-3">
								<span data-i18n="drpdwn.page-logout">Logout</span>
							</button>
						</div>
					</div>
				</div>
			</header>
		)
	}
}
