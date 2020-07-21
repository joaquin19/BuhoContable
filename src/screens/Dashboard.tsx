import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Layout from '../layout'

const breadcrumb = [
	{
		target: '/',
		name: 'Home',
		active: true
	}
]

export default class Dashboard extends Component {
	render() {
		return (
			<Layout breadcrumb={breadcrumb} >
				<div className="row">
					<div className="col-xl-10 sortable-grid ui-sortable">
						<div id="panel-3" className="panel panel-sortable" role="widget">
							<div className="panel-hdr" role="heading">
								<h2 className="ui-sortable-handle"></h2>
								<div className="panel-saving mr-2" style={{ display: "none" }}>
									<i className="fal fa-spinner-third fa-spin-4x fs-xl" />
								</div>
								<div className="panel-toolbar" role="menu">
									<Link to='' className="btn btn-panel hover-effect-dot js-panel-collapse waves-effect waves-themed" data-toggle="tooltip" data-offset="0,10" data-original-title="Collapse" />
									<Link to='' className="btn btn-panel hover-effect-dot js-panel-fullscreen waves-effect waves-themed" data-toggle="tooltip" data-offset="0,10" data-original-title="Fullscreen" />
									<Link to='' className="btn btn-panel hover-effect-dot js-panel-close waves-effect waves-themed" data-toggle="tooltip" data-offset="0,10" data-original-title="Close" />
								</div>
								<div className="panel-toolbar" role="menu">
									<Link to='' className="btn btn-toolbar-master waves-effect waves-themed" data-toggle="dropdown">
										<i className="fal fa-ellipsis-v" />
									</Link>
									<div className="dropdown-menu dropdown-menu-animated dropdown-menu-right p-0">
										<Link to='' className="dropdown-item js-panel-refresh">
											<span data-i18n="drpdwn.refreshpanel">Refresh Content</span>
										</Link>
										<Link to='' className="dropdown-item js-panel-locked">
											<span data-i18n="drpdwn.lockpanel">Lock Position</span>
										</Link>
										<div className="dropdown-multilevel dropdown-multilevel-left">
											<div className="dropdown-item">
												<span data-i18n="drpdwn.panelcolor">Panel Style</span>
											</div>
											<div className="dropdown-menu d-flex flex-wrap" style={{ minWidth: "9.5rem", width: "9.5rem", padding: "0.5rem" }}>
												<Link to='' className="btn d-inline-block bg-primary-700 bg-success-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-primary-700 bg-success-gradient" style={{ margin: "1px" }}></Link>
												<Link to='' className="btn d-inline-block bg-primary-500 bg-info-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-primary-500 bg-info-gradient" style={{ margin: "1px" }}></Link>
												<Link to='' className="btn d-inline-block bg-primary-600 bg-primary-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-primary-600 bg-primary-gradient" style={{ margin: "1px" }}></Link>
												<Link to='' className="btn d-inline-block bg-info-600 bg-primray-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-info-600 bg-primray-gradient" style={{ margin: "1px" }}></Link>
												<Link to='' className="btn d-inline-block bg-info-600 bg-info-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-info-600 bg-info-gradient" style={{ margin: "1px" }}></Link>
												<Link to='' className="btn d-inline-block bg-info-700 bg-success-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-info-700 bg-success-gradient" style={{ margin: "1px" }}></Link>
												<Link to='' className="btn d-inline-block bg-success-900 bg-info-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-success-900 bg-info-gradient" style={{ margin: "1px" }}></Link>
												<Link to='' className="btn d-inline-block bg-success-700 bg-primary-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-success-700 bg-primary-gradient" style={{ margin: "1px" }}></Link>
												<Link to='' className="btn d-inline-block bg-success-600 bg-success-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-success-600 bg-success-gradient" style={{ margin: "1px" }}></Link>
												<Link to='' className="btn d-inline-block bg-danger-900 bg-info-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-danger-900 bg-info-gradient" style={{ margin: "1px" }}></Link>
												<Link to='' className="btn d-inline-block bg-fusion-400 bg-fusion-gradient width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-fusion-400 bg-fusion-gradient" style={{ margin: "1px" }}></Link>
												<Link to='' className="btn d-inline-block bg-faded width-2 height-2 p-0 rounded-0 js-panel-color hover-effect-dot waves-effect waves-themed" data-panel-setstyle="bg-faded" style={{ margin: "1px" }}></Link>
											</div>
										</div>
										<div className="dropdown-divider m-0"></div>
										<Link to='' className="dropdown-item js-panel-reset">
											<span data-i18n="drpdwn.resetpanel">Reset Panel</span>
										</Link>
									</div>
								</div>
							</div>
							<div className="panel-container show">
								<div className="panel-content">

								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout >
		)
	}
}

const ColoredDateCellWrapper = ({ children }) =>
	React.cloneElement(React.Children.only(children), {
		style: {
			backgroundColor: 'lightblue',
		},
	})
