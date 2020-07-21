import React, { Component } from 'react';
import { Col, FormText, Label, FormGroup } from 'reactstrap';
import Select2 from 'react-select2-wrapper'
import 'react-select2-wrapper/css/select2.css'

interface Props extends React.Props<SelectField> {
	onChangeField: (data) => void;
	onClick: () => void;
	input: any;
	meta: any;
	label: string;
	placeholder: string;
	addButton?: boolean;
}

export default class SelectField extends Component<Props> {
	render() {
		const { input, meta, onChangeField, onClick, label, placeholder, addButton } = this.props;
		return (
			<Col>
				<FormGroup>
					<Label for={input.name}>{label}</Label>
					{addButton ?
						<div className='row col-12'>
							<Select2
								{...this.props}
								{...input}
								className='form-control col-11'
								options={{
									placeholder,
								}}
								defaultValue={input.value}
								onChange={(e) => {
									if (onChangeField != undefined && e.target.value) {
										onChangeField({ value: e.target.value, target: input.name });
									}
									console.log(e.target.value)
									input.onChange(e.target.value);
								}}
								invalid={meta.touched && meta.error !== undefined ? true : false}
								valid={meta.touched && meta.error === undefined ? true : false}
							/>
							<i className='fas fa-plus ml-3 mt-1' onClick={onClick} style={{ color: 'green', fontSize: '1rem' }} />
						</div> :
						<Select2
							{...this.props}
							{...input}
							className='form-control'
							style={{ width: '100%' }}
							options={{
								placeholder,
							}}
							defaultValue={input.value}
							onChange={(e) => {
								if (onChangeField != undefined && e.target.value) {
									onChangeField({ value: e.target.value, target: input.name });
								}
								input.onChange(e.target.value);
							}}
							invalid={meta.touched && meta.error !== undefined ? true : false}
							valid={meta.touched && meta.error === undefined ? true : false}
						/>
					}
					{meta.touched && meta.error &&
						<FormText color="danger" style={{ fontSize: '13px' }}>
							{meta.error}
						</FormText>
					}
				</FormGroup>
			</Col>
		)
	}
}
