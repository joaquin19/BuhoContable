import React, { Component } from 'react'
import { Col, FormText, Input, Label, FormGroup } from 'reactstrap';
import DatePicker from 'react-datepicker'
import "./Date.css"


interface Props extends React.Props<DateRangeField>{
    onChangeField: (data) => void;
    input: any;
    meta: any;
    name: Array<string>;
    label: string;
}

interface State {
    startDate: Date;
    endDate: Date;
}


export default class DateRangeField extends Component<Props, State> {
    constructor(props){
        super(props);
        this.state = {
            startDate: props.input.value ? new Date(props.input.value) : new Date(),
            endDate: props.input.value ? new Date(props.input.value) : new Date()
        }
    }

    render() {
        const {input, meta, onChangeField, name, label} = this.props;
        const {startDate, endDate} = this.state;
        return (
            <Col>
                <FormGroup>
                    <Label className='mr-5' for={input.name}>{label}</Label>
                    <DatePicker
                        {...this.props}
                        {...input}
                        name={name[0]}
                        selected={startDate}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        onChange={date => {
                            this.setState({startDate: date });
                            if(onChangeField != undefined) onChangeField({target: input.name, value: date});
                            input.onChange(date);
                        }}
                        customInput={<Input
                                style={{ fontSize: '13px'}}
                                invalid={meta.touched && meta.error !== undefined ? true : false}
                                valid={meta.touched && meta.error === undefined ? true : false}
                            />
                        }
                    />
                    <DatePicker
                        {...this.props}
                        {...input}
                        name={name[1]}
                        selected={endDate}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        onChange={date => {
                            this.setState({endDate: date });
                            if(onChangeField != undefined) onChangeField({target: input.name, value: date});
                            input.onChange(date);
                        }}
                        customInput={<Input
                                style={{ fontSize: '13px'}}
                                invalid={meta.touched && meta.error !== undefined ? true : false}
                                valid={meta.touched && meta.error === undefined ? true : false}
                            />
                        }
                    />
                    {meta.touched && meta.error &&
                        <FormText color="danger" style={{fontSize: '13px'}}>
                            {meta.error}
                        </FormText>
                    }
                </FormGroup>
            </Col>
        )
    }
}
