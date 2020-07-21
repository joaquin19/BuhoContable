import React, { Component, useState } from 'react'
import { Col, FormText, Input, Label, FormGroup } from 'reactstrap';

interface Props extends React.Props<RadioButton> {
	onChangeField: (data) => void;
	onClick: () => void;
	input: any;
	meta: any;
	label?: any;
	answers: any;
}

interface State {
	checked: string;
}

export default class RadioButton extends Component<Props> {
	state = {
		selected: this.props.input.value
	}

	changeSelected = (e) => {
		this.setState({ selected: e.target.value });
	}

	render() {
		const { input, meta, onChangeField, label, answers } = this.props;
		return (
			<Col>
				<FormGroup>
					<Label>{label}</Label>
					{
						answers.map((answer) => (
							<FormGroup>
								<Label>
									<Input
										name={input.name}
										type='radio'
										value={answer.type}
										onChange={(e) => {
											if (onChangeField != undefined) onChangeField({ target: input.name, value: answer.type })
											input.onChange(answer.type)
										}}
										checked={input.value === answer.type}
										valid={meta.touched && meta.error === undefined ? true : false}
										invalid={meta.touched && meta.error !== undefined ? true : false}
									/>
									{` ${answer.content}`}
								</Label>
							</FormGroup>
						))
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
