import React, { Component } from 'react'

interface Props extends React.Props<SubHeader> {
	icon: string;
	title: string;
	subtitle?: string;
	widget?: any;
}

export default class SubHeader extends Component<Props> {
	render() {
		const { icon, title, subtitle, widget } = this.props;
		return (
			<div className="subheader">
				<h1 className="subheader-title">
					<i className={`subheader-icon ${icon}`}></i> {title} <span className='fw-300'>{subtitle}</span>
					<small />
				</h1>
				<div className="d-flex mr-0">
					{widget}
				</div>
			</div>
		)
	}
}
