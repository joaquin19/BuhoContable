import React, { Component } from "react";
import { Col, FormText, Label, FormGroup } from "reactstrap";
import InputMask from "react-input-mask";

interface Props extends React.Props<InputMaskField> {
	onChangeField: (data) => void;
	input: any;
	meta: any;
	label: string;
}

interface State {
	value: string;
}

export default class InputMaskField extends Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}
	onMasked = (newState, oldState, userInput) => {
		var { value } = newState;
		var selection = newState.selection;
		var cursorPosition = selection ? selection.start : null;

		// keep minus if entered by user
		if (value.endsWith('-') && userInput !== '-' && !this.state.value.endsWith('-')) {
			if (cursorPosition === value.length) {
				cursorPosition--;
				selection = { start: cursorPosition, end: cursorPosition };
			}
			value = value.slice(0, -1);
		}

		return {
			value,
			selection
		};
	}

	onChange = (e) => {
		this.setState({ value: e.target.value });
		//this.props.onChangeField({ target: this.props.input.name, value: e.target.value });
		this.props.input.onChange(e.target.value);
	}
	render() {
		const { input, meta, label } = this.props;
		return (
			<Col>
				<FormGroup>
					<Label className="mr-5" for={input.name}>
						{label}
					</Label>
					<InputMask
						{...this.props}
						className="form-control"
						style={{ fontSize: "13px" }}
						value={this.state.value}
						onChange={this.onChange}
						invalid={meta.touched && meta.error !== undefined ? true : false}
						valid={meta.touched && meta.error === undefined ? true : false}
					/>
					{meta.touched && meta.error && (
						<FormText color="danger" style={{ fontSize: "13px" }}>
							{meta.error}
						</FormText>
					)}
				</FormGroup>
			</Col>
		);
	}
}
