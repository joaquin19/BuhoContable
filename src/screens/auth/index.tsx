import React, { Component, Fragment } from 'react'
import { actionsReducers } from '../../reducers';
import { connect } from 'react-redux';
import Form from './Form'
import './login.css'
import FormChangePassword from './FormChangePassword';
import FormForgotPassword from './FormForgotPassword';


interface Props extends React.Props<Login> {
    login: (data) => Promise<any>;
    resetViewLogin: () => void;
    changePassword: (data) => void;
    forgotPasswordView: () => void;
    sendPassword: (data) => void;
    validate: () => void;
    isPasswordDefault: boolean;
    isForgotPasswordView: boolean;
}

interface State {
}

class Login extends Component<Props, State> {
    constructor(props) {

        super(props);
        props.validate();
        this.onLogin = this.onLogin.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onForgotPassword = this.onForgotPassword.bind(this);
        this.onSendPassword = this.onSendPassword.bind(this);
        this.props.resetViewLogin();
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    onLogin(data: any) {
        this.props.login(data);
    }

    onChangePassword(data: any) {
        this.props.changePassword(data);
    }

    onForgotPassword(obj: any) {
        obj.preventDefault();
        this.props.forgotPasswordView();
    }

    onSendPassword(data) {
        this.props.sendPassword(data);
    }

    render() {
        //const { login } = this.props;
        return (
            <>
                < Fragment >
                    <div className="blankpage-form-field">
                        <div className="page-logo m-0 w-100 align-items-center justify-content-center rounded border-bottom-left-radius-0 border-bottom-right-radius-0 px-4">
                            <a href='/#' className="page-logo-link press-scale-down d-flex align-items-center">
                                <img src={require("./static/logo.png")} alt="SmartAdmin WebApp" aria-roledescription="logo" />
                                <span className="page-logo-text mr-1">Buho Contable</span>
                                <i className="fal fa-angle-down d-inline-block ml-1 fs-lg color-primary-300"></i>
                            </a>
                        </div>
                        {
                            !this.props.isForgotPasswordView && this.props.isPasswordDefault ?
                                <FormChangePassword changePassword={this.onChangePassword} />
                                :
                                !this.props.isForgotPasswordView && !this.props.isPasswordDefault ?
                                    <Form login={this.onLogin} forgotPassword={this.onForgotPassword} />
                                    :
                                    <FormForgotPassword sendPassword={this.onSendPassword} />
                        }
                        <div className="blankpage-footer text-center">
                        </div>
                    </div>
                    <div className="login-footer p-2">
                        <div className="row">
                            <div className="col col-sm-12 text-center">
                            </div>
                        </div>
                    </div>
                    <video poster={require("./static/clouds.png")} id="bgvid" playsInline autoPlay muted loop>
                        <source src={require("./static/cc.webm")} type="video/webm" />
                        <source src={require("./static/cc.mp4")} type="video/mp4" />
                    </video>
                </Fragment >
            </>)
    }
}

function mapStateToProps(state: any) {
    return {
        isPasswordDefault: state.auth.isPasswordDefault,
        isForgotPasswordView: state.auth.isForgotPasswordView
    }
}

const mapDispatchToProps = dispatch => ({
    login: (data) => {
        dispatch({
            type: actionsReducers.LOGIN,
            payload: data,
        });
    },
    resetViewLogin: () => {
        dispatch({
            type: actionsReducers.RESET_VIEW_LOGIN
        });
    },
    changePassword: (data) => {
        dispatch({
            type: actionsReducers.CHANGE_PASSWORD,
            payload: data,
        });
    },
    forgotPasswordView: () => {
        dispatch({
            type: actionsReducers.FORGOT_PASSWORD_VIEW
        });
    },
    sendPassword: (data) => {
        dispatch({
            type: actionsReducers.SEND_PASSWORD,
            payload: data,
        });
    },
    validate: () => {
        dispatch({ type: actionsReducers.VALIDATE });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)
