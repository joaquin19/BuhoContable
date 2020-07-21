import React, { Component } from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { Button } from 'reactstrap'
import Fields from '../Inputs'
import { FormText } from 'reactstrap'

interface Props extends React.Props<Generic> {
	settingsForm?: any;
	values?: any;
	initialValues?: any;
	handleSubmit?: any;
	pristine?: any;
	submitting?: any;
}

class Generic extends Component<Props> {
	render() {
		const { handleSubmit, settingsForm, pristine, submitting } = this.props;
		const { titleForm, icon, form, onSubmit, buttonName } = settingsForm;
		return (
			<div id="panel-2" className="panel col-12">
				<div className="panel-hdr">
					<h2>
						{titleForm} {icon ? <span className="fw-300"><i className={`fas ${icon}`}></i></span> : null}
					</h2>
				</div>
				<div className="panel-container show">
					<div className="panel-content">
						<div className='row'>
							{form.inputs.map((input: any, key: number) => (
								<div key={`form-field-${key}`} className={input.fieldArray ? 'col-md-12' : input.className ? input.className : 'col-md-6 mb-5'}>
									{
										input.fieldArray != undefined ?
											(
												<FieldArray
													component={renderFieldArray}
													{...input}
													indexInput={key + 1}
												/>
											)
											:
											(
												<Field
													component={Fields[input.field]}
													{...input}
													tabIndex={key + 1}
												/>
											)
									}

								</div>
							))}
						</div>
						<div className='row'>
							<div className='col-md-4'></div>
							<div className='col-md-4 text-center mb-5'>
								<Button disabled={pristine || submitting} onClick={handleSubmit(onSubmit)}>{buttonName}</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const renderFieldArray = ({ fields, meta: { error, submitFailed }, inputs, nameField, buttonName, indexInput, disabledLength }) => (
	<>
		<div className='row'>
			<div className='col-md-4'></div>
			<div className='col-md-4 text-center mb-5'>
				<Button style={{ width: '100%' }} disabled={fields.length === disabledLength} onClick={() => fields.push({})}>{buttonName}</Button>
			</div>
		</div>
		<div className='row'>
			{fields.map((fieldData, indexFields: number) => (
				<>
					<h1 key={`head-fieldArray-${indexFields}`} className='text-center text-primary col-md-12 mt-5'>
						{`${nameField} ${indexFields + 1}   `}
						<i
							onClick={() => fields.remove(indexFields)}
							style={{ color: 'red', fontSize: '20px', marginRight: '10px' }}
							className={`ml-5 fas fa-trash-alt`}>
						</i>
					</h1>
					{
						submitFailed && error &&
						<FormText color="danger" style={{ fontSize: '13px' }}>
							{error}
						</FormText>
					}
					{
						inputs.map((input, index) => (
							<div key={`form-fieldArray-${index}`} className={input.className ? input.className : 'col-md-6 mb-5'}>
								<Field
									component={Fields[input.field]}
									{...input}
									name={`${fieldData}.${input.name}${index + 1}`}
									tabIndex={(indexInput + (index + 1)) + indexFields > 0 ? ((indexFields) * inputs.length) : 0}
								/>
							</div>
						))
					}
				</>
			))}
		</div>
	</>
)

export default reduxForm({ form: 'GenericForm', enableReinitialize: true })(Generic)
