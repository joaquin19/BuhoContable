import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Input, Tooltip, Label } from 'reactstrap'


const InputField = ({ input, label, nameInp, placeholder, className, type, meta: { touched, error, warning } }) => {
    switch (type) {
        case ('text'):
        case ('email'):
        case ('password'):
            return (
                <div className="form-group">
                    <Label className="form-label" htmlFor={nameInp}>{label}</Label>
                    <div>
                        <Input {...input} className={className}
                            invalid={touched && error !== undefined ? true : false}
                            valid={touched && error === undefined ? true : false}
                            id={nameInp} name={nameInp} type={type} placeholder={placeholder} />
                        <Tooltip placement="top" isOpen={touched && error !== undefined} autohide={false} target={nameInp}>
                            {error}
                        </Tooltip>
                    </div>
                </div>)
        case ('checkbox'):
            return (
                <div className="custom-control custom-checkbox">
                    <Input  {...input} type={type} className={className} id={nameInp} name={nameInp} />
                    {touched && error && <strong>{error}</strong>}
                    <Label className="custom-control-label" htmlFor={nameInp}>{label}</Label>
                </div>
            )
    }

}

interface Props extends React.Props<Form> {
    handleSubmit: any;
    login: (data) => void;
    forgotPassword: (obj) => void;
}

class Form extends Component<Props> {
    render() {
        const { handleSubmit, login, forgotPassword } = this.props;
        return (
            <div className="card p-4 border-top-left-radius-0 border-top-right-radius-0">
                <form onSubmit={handleSubmit(login)}>
                    <Field name="email" nameInp="email" type="text" className="form-control" placeholder="email" component={InputField}
                        label="Email" validate={[required, email]} />
                    <Field name="password" nameInp='password' type="password" component={InputField} className="form-control" placeholder="password"
                        label='Password' validate={[required]} />
                    <div className="form-group text-left">
                        <Field name="rememberme" nameInp="rememberme" type="checkbox" component={InputField} className="custom-control-input" label="Remember me" />
                    </div>
                    <button type="submit" className="btn btn-default float-right">Secure login</button>
                </form>
                <a href="#" onClick={forgotPassword} className="float-right">Forgot Password </a>
            </div>
        )
    }
}

const required = value => value ? undefined : 'Required';
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;

export default reduxForm({ form: 'Login' })(Form)