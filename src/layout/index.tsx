import React, { Fragment } from 'react'
import { Sidebar, Navbar, Breadcrumb, Footer, Floating } from './components'
import { menuType, breadcrumbType } from './types'
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import { actionsReducers } from '../reducers';
import { Input } from 'reactstrap'
import LogoutPopup from './components/LogoutPopup'
import SubHeader from './components/SubHeader';

/**
 * in this index all the components that make up the main platform are joined, 
 * as well as the alert that will be used in all project catalogs
 */

interface dataModules {
	name: string;
	icon: string;
}

interface Props {
	breadcrumb?: Array<breadcrumbType>;
	children?: any;
	subHeader?: any;
	alert?: boolean;
	alertTitle?: string;
	confirmAlert?: () => void;
	cancelAlert?: () => void;
	onChangeAlert?: (e: any) => void;
	user?: any;
	validate: () => void;
	logout: () => void;
	renew: () => void;
	match?: any;
	history?: any;
}

interface State {
	title: string;
	logo: any;
	user: any;
	menu: Array<menuType>;
}

class Layout extends React.Component<Props, State> {

	idleTimer: any;

	constructor(props) {
		super(props);
		props.validate();
		let menu = props.menu.map(m => {
			let targets = m.screens.map(scr => (
				{
					to: `${scr.path}`,
					icon: scr.icon,
					name: scr.value
				}
			));
			return {
				name: m.value,
				icon: m.icon,
				targets
			};
		});
		this.state = {
			title: 'Reddit Post',
			logo: require('./assets/img/logo.png'),
			user: props.user,
			menu,
		}
	}

	render() {
		const { title, logo, user, menu } = this.state;
		const { breadcrumb, children, subHeader, alert, alertTitle, confirmAlert, cancelAlert, onChangeAlert, logout, renew } = this.props;
		return (
			<>
				<LogoutPopup renew={renew} logout={logout} />
				<Fragment>
					<div className="page-wrapper">
						<div className="page-inner">
							<Sidebar title={title} logo={logo} user={user} menu={menu} />
							<div className="page-content-wrapper">
								<Navbar logout={logout} user={user} logo={logo} title={title} />
								<main id="js-page-content" role="main" className="page-content">
									<Breadcrumb breadcrumb={breadcrumb} />
									<SubHeader {...subHeader} />
									{children}
								</main>
								<Footer />
							</div>
						</div>
					</div>
					<Floating logout={logout} />
					{alert ? <SweetAlert
						info
						input
						showCancel
						style={{ zIndex: 1051 }}
						show={alert}
						confirmBtnText="Yes"
						confirmBtnBsStyle="info"
						cancelBtnBsStyle="info"
						title={alertTitle}
						onConfirm={confirmAlert}
						onCancel={cancelAlert}>
						<Input type="textarea" name="comments" onChange={onChangeAlert} id="comments" placeholder="you comment something?" />
					</SweetAlert> : null}

				</Fragment>
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		user: state.auth.user,
		menu: state.auth.menu
	}
};

const mapDispatchToProps = dispatch => ({
	validate: () => {
		dispatch({ type: actionsReducers.VALIDATE });
	},
	renew: () => {
		dispatch({ type: actionsReducers.RENEW });
	},
	logout: () => {
		dispatch({ type: actionsReducers.LOGOUT })
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(Layout)