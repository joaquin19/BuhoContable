import React, { Component } from 'react'
import { Col, FormText, Input, Label, FormGroup } from 'reactstrap'
import './Tag.scss'

interface Props extends React.Props<TagField> {
	onChangeField: (data) => void;
	label: string;
	input: any;
	meta: any;
	tags: Array<any>;
	placeholder: string;
	type: string;
}

export default class TagField extends Component<Props> {
	AddTags = event => {
		if (event.key === "Enter" && event.target.value !== '' && this.props.meta.error === undefined) {
			this.props.onChangeField({
				target: this.props.input.name,
				value: [...this.props.tags, event.target.value]
			});
			this.props.input.onChange('');
		}
	};

	RemoveTags = indexToRemove => {
		this.props.onChangeField({
			target: this.props.input.name,
			value: [...this.props.tags.filter((_, index) => index !== indexToRemove)]
		});
	};

	RenderTags = () => {
		return this.props.tags.map((tag, index) => (
			<button
				key={index}
				type="button"
				className="btn btn-xs btn-primary waves-effect waves-themed mt-1 mr-1"
				onClick={() => this.RemoveTags(index)}
			>
				{tag}
			</button>
		))
	}

	render() {
		const { input, meta, label } = this.props;
		return (
			<Col>
				<FormGroup>
					<Label className='mr-5' for={input.name}>{label}</Label>
					<div className="tags-input">
						{this.RenderTags()}
						<Input
							{...this.props}
							{...input}
							className='col-11 formGroup input-tag mt-2'
							onKeyUp={event => this.AddTags(event)}
							valid={meta.touched && meta.error === undefined ? true : false}
							invalid={meta.touched && meta.error !== undefined ? true : false}
						/>
					</div>
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