import React, { Component } from 'react'
import { Col, FormText, Input, Label, FormGroup} from 'reactstrap';

interface Props extends React.Props<InputField>{
    onChangeField: (data) => void;
    onClick: () => void;
    input: any;
    meta: any;
    label: string;
    addButton?: boolean;
}

export default class InputField extends Component<Props> {
    render() {
        const {input, meta, label, addButton, onChangeField, onClick} = this.props;
        return (
            <Col>
                <FormGroup>
                    <Label className='mr-5' for={input.name}>{label}</Label>
                    {addButton ? 
                        <div className='row col-12'>
                            <Input
                                {...this.props}
                                {...input}
                                className='col-11 formGroup'
                                style={{ fontSize: '13px' }}
                                onChange={(e) => {
                                    if(onChangeField != undefined && e.target.value){
                                        onChangeField({value: e.target.value, target: input.name});
                                    }
                                    input.onChange(e.target.value);
                                }}
                                valid={meta.touched && meta.error === undefined ? true : false}
                                invalid={meta.touched && meta.error !== undefined ? true : false}
                            />
                            <i className='fas fa-plus ml-3 mt-2' onClick={onClick} style={{ color: 'green', fontSize: '1rem' }} />
                        </div> :
                        <Input
                            {...this.props}
                            {...input}
                            style={{ fontSize: '13px' }}
                            onChange={(e) => {
                                if(onChangeField != undefined && e.target.value){
                                    onChangeField({value: e.target.value, target: input.name});
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
