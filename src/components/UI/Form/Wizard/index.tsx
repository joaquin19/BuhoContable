import React, { Component } from 'react'
import PageForm from './PageForm'


interface Props extends React.Props<Wizard> {
	initialValues?: any;
	settingsForm?: any;
}

interface State {
	page: number;
	pages: number;
}

export default class Wizard extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			page: 0,
			pages: props.settingsForm.form.inputs.length - 1,
		}
	}

	previous = () => {
		const { page } = this.state;
		this.setState({ page: page - 1 });
	}

	next = () => {
		const { page } = this.state;
		this.setState({ page: page + 1 });
	}

	changePage = page => {
		this.setState({
			page
		});
	}

	render() {
		const { page, pages } = this.state;
		const { form, onSubmit } = this.props.settingsForm;
		return (
			<div id="panel-2" className="panel col-12">
				<div className="panel-container show">
					<div className="panel-content">
						<ul className="nav nav-tabs" role="tablist">
							{form.inputs.map((pg, key) => (
								<li key={`tab-li-${key}`} className="nav-item">
									<a className={`nav-link fs-x1 py-3 px-5 ${key === 0 ? 'active' : ''}`} data-toggle="tab" onClick={() => this.changePage(key)} role="tab" href='/#'>
										<i className={`fal ${pg.icon} text-primary`}></i>
										<span className="hidden-sm-down ml-1">{pg.titleForm}</span>
									</a>
								</li>
							))}
						</ul>
						<div className="tab-content border border-top-0 p-3">
							<PageForm
								page={page}
								pages={pages}
								nameButton='Save'
								sections={form.inputs[page].sections}
								dataTable={form.inputs[page].dataTable ? true : false}
								data={form.inputs[page].dataTable ? form.inputs[page].data : null}
								columns={form.inputs[page].dataTable ? form.inputs[page].columns : null}
								onSubmit={onSubmit}
								initialValues={this.props.initialValues} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}