import React, { Component } from 'react'
import { Col, FormText, Input, Label, FormGroup, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

interface Props extends React.Props<InputGroupField>{
    onChangeField: (data) => void;
    label: string;
    input: any;
    meta: any;
    sign: string;
}

export default class InputGroupField extends Component<Props> {
    render() {
        const {input, meta, label, sign, onChangeField} = this.props;
        return (
            <Col>
                <FormGroup>
                    <Label className='mr-5' for={input.name}>{label}</Label>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText>{sign}</InputGroupText>
                        </InputGroupAddon>
                        <Input
                            {...this.props}
                            {...input}
                            style={{ fontSize: '13px' }}
                            onChange={(e) => {
                                if(onChangeField != undefined && e.target.value){
                                    onChangeField({target: input.name, value: e.target.value});
                                }
                                input.onChange(e.target.value);
                            }}
                            invalid={meta.touched && meta.error !== undefined ? true : false}
                            valid={meta.touched && meta.error === undefined ? true : false}
                        />
                    </InputGroup>
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
