import React, { Component } from 'react';
import { Col, FormText, Input, Label, FormGroup } from 'reactstrap';
import DatePicker from 'react-datepicker'
import moment from 'moment'
import "./Date.css"

interface Props extends React.Props<DateField> {
	onChangeField: (data) => void;
	label: string;
	input: any;
	meta: any;

}

interface State {
	startDate: any;
}

export default class DateField extends Component<Props, State>{
	constructor(props) {
		super(props);
		this.state = {
			startDate: props.meta.initial ? new Date(props.meta.initial) : new Date()
		}
	}

	render() {
		const { input, meta, onChangeField, label } = this.props;
		const { startDate } = this.state;
		return (
			<Col>
				<FormGroup>
					<Label className='mr-5' for={input.name}>{label}</Label>
					<DatePicker
						selected={startDate}
						openToDate={startDate}
						{...this.props}
						{...input}
						dateFormat="MMMM d, yyyy"
						customInputRef='ref'
						onChange={date => {
							this.setState({ startDate: date });
							if (onChangeField != undefined) onChangeField({ target: input.name, value: date });
							input.onChange(date);
						}}
						customInput={
							<Input
								{...input}
								style={{ fontSize: '13px' }}
								ref={(input: any) => input.focus()}
							/>
						}
						invalid={meta.touched && meta.error !== undefined ? true : false}
						valid={meta.touched && meta.error === undefined ? true : false}
					/>
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