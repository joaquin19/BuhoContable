import React, { Component } from 'react'
import { Col, FormText, Label, FormGroup} from 'reactstrap';
import Switch from "react-switch";

interface Props extends React.Props<SwitchFile>{
    onChangeField: (data) => void;
    label: string;
    input: any;
    meta: any;
}

export default class SwitchFile extends Component<Props> {
    render() {
        const {input, meta, label, onChangeField} = this.props;
        return (
            <Col>
                <FormGroup>
                    <Label for={input.name}>{label}</Label>
                    <br />
                    <Switch
                        {...input}
                        checked={input.value}
                        className="react-switch"
                        onChange={(e) => {
                            if(onChangeField != null){
                                onChangeField({target: input.name, value: e});
                            }
                            input.onChange(e);
                        }}
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
