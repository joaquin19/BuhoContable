import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button } from 'reactstrap'

import Fields from '../Inputs'

interface Props extends React.Props<GenericCol> {
    settingsForm?: any;
    values?: any;
    initialValues?: any;
    handleSubmit?: any;
    pristine?: any;
    submitting?: any;
}


class GenericCol extends Component<Props> {
    render() {
        const { handleSubmit, settingsForm, pristine, submitting } = this.props;
        const { form, onSubmit, buttonName } = settingsForm;
        return (
            <div className='col-12'>
                <div className='row'>
                    {form.inputs.map((input, key) => (
                        <div key={`form-field-${key}`} className= {form.className ? form.className : 'col-md-6 mb-5'}>
                            <Field
                                component={Fields[input.field]}
                                {...input} 
                            />
                        </div>
                    ))}
                </div>
                <div className='row'>
                    <div className='col-md-4'></div>
                    <div className='col-md-4 text-center mb-5'>
                        <Button color='primary' disabled={pristine || submitting} onClick={handleSubmit(onSubmit)}>{buttonName}</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default reduxForm({ form: 'ColForm', enableReinitialize: true })(GenericCol);