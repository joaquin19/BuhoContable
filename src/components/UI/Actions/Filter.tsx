import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Input } from 'reactstrap';
import Fields from '../Inputs'
import { field } from '../../types'


interface Props extends React.Props<Filter> {
    handleSubmit: any;
    onClick: (data) => void;
    fields: Array<field>;
    value?: any;
    values?: any;
    initialValues?: any;
}


class Filter extends Component<Props> {
    render() {
        const { handleSubmit, onClick, fields } = this.props;
        return (
            <form>
                <div className="row">
                    {fields.map((input: any, key: number) => (
                        <div key={`col-filter-fields-${key}`} className='col-md-4 mb-5'>
                            <Field
                                component={Fields[input.field]}
                                {...input}
                            />
                        </div>
                    ))}
                </div>
                <div className='row'>
                    <div className='col-md-4 offset-4 text-center mb-5'>
                        <Button className="mt-3" color="primary" onClick={handleSubmit(onClick)} title="Execute the filter">
                            <i className="fas fa-search"></i>
                        </Button>
                    </div>
                </ div>
            </form>
        )
    }
}

export default reduxForm({ form: 'Filter', enableReinitialize: true })(Filter)
