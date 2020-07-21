import React, { Component } from 'react'
import Tabs from './Tabs'

interface Props extends React.Props<CardTabs> {
	title: string;
	tabs: Array<any>;
	children: any;
}

export default class CardTabs extends Component<Props> {
	render() {
		const { title, tabs, children } = this.props;
		return (
			<div className="panel col-12" data-panel-lock="false" data-panel-close="false" data-panel-fullscreen="false" data-panel-collapsed="false" data-panel-color="false" data-panel-locked="false" data-panel-refresh="false" data-panel-reset="false">
				<div className="panel-hdr">
					<h2>
						{title}
					</h2>
					<div className="panel-toolbar pr-3 align-self-end">
						<Tabs data={tabs} />
					</div>
				</div>
				<div className="panel-container show">
					<div className="panel-content border-faded border-left-0 border-right-0 border-top-0">
						<div className="row no-gutters">
							{children}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
