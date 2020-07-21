import React, { Component } from 'react'
import { breadcrumbType } from '../types'
import { Link } from 'react-router-dom'
import moment from 'moment'

interface Props {
	breadcrumb: Array<breadcrumbType>;
}

export default class Breadcrumb extends Component<Props, {}> {
	render() {
		const { breadcrumb } = this.props;
		return (
			<ol className="breadcrumb page-breadcrumb">
				{breadcrumb.map((bc, key) => (
					<li key={key} className={`breadcrumb-item ${bc.active ? 'active' : ''}`}>
						<Link to={bc.target}>{bc.name}</Link>
					</li>
				))}
				<li className="position-absolute pos-top pos-right d-none d-sm-block"><span>{moment(new Date()).format('dddd, MMMM Do YYYY')}</span></li>
			</ol>
		)
	}
}
