import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import 'react-select2-wrapper/css/select2.css'
import "react-datepicker/dist/react-datepicker.css"
import { Col, Button } from 'reactstrap';
import Fields from '../../Inputs'
import Table from '../../Table'


interface Props extends React.Props<PageForm> {
	error?: any;
	handleSubmit?: any;
	nameButton?: string;
	onSubmit?: (data) => void;
	pristine?: any;
	submitting?: any;
	sections?: Array<any>;
	page?: number;
	pages?: number;
	dataTable?: boolean;
	data?: Array<any>;
	columns?: any;
}


class PageForm extends Component<Props> {
	render() {
		const { error, handleSubmit, nameButton, sections, onSubmit, pristine, submitting, dataTable, data, columns } = this.props;
		return (
			<form>
				<div className='row'>
					{sections.map((section, key) => {
						let pos = key;
						return (
							<Col key={`section-col-${key}`}
								className={`text-center ${sections.length === 1 || (sections.length % 2 && key === sections.length - 1) ? 'col-md-12' : 'col-md-6'}`}
							>
								<h1 className='mb-5 text-primary'>{section.name}</h1>
								<div className='row'>
									{section.customForm ? section.component : section.inputsForm.map((input, key) => (
										<div key={`form-field-${key}`}
											className={`text-left ${pos !== sections.length - 1 ? 'col-md-12' : 'col-md-6'} mb-5`}>
											<Field
												component={Fields[input.field]}
												{...input}
											/>
										</div>
									))}
								</div>
							</Col>
						)
					})}
					<div className='row text-center'>{error && <strong>{error}</strong>}</ div>
				</div>
				{dataTable && data.length > 0 ? <div className='row justify-content-center'>
					<div className='col-8 mb-5'>
						<Table
							cells={columns}
							rows={data}
						/>
					</div>
				</div> : null}
				<div className='row mt-5'>
					<div className='col-md-4'></div>
					<div className='col-md-4 text-center mb-5'>
						<Button type='button' disabled={pristine || submitting} onClick={handleSubmit(onSubmit)}>{nameButton}</Button>
					</div>
				</div>
			</form>
		)
	}
}


export default reduxForm({
	form: 'Wizard',
	destroyOnUnmount: false,
	forceUnregisterOnUnmount: false,
	enableReinitialize: true
})(PageForm)
