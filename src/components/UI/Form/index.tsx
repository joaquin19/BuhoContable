import React, { Component } from 'react'
import { connect } from 'react-redux'

import Generic from './Generic'
import GenericCol from './GenericCol'
import Wizard from './Wizard'


interface Props extends React.Props<Form>{
    settingsForm: any;
    initialValues: any;
}

class Form extends Component<Props> {
    render() {
        const {form} = this.props.settingsForm.form;
        switch (form) {
            case 'Generic':
                return (
                    <Generic initialValues={this.props.initialValues} settingsForm={this.props.settingsForm} />
                );
            case 'GenericCol':
                return (
                    <GenericCol initialValues={this.props.initialValues} settingsForm={this.props.settingsForm} />
                );
            case 'Wizard':
                return (
                    <Wizard initialValues={this.props.initialValues} settingsForm={this.props.settingsForm} />
                );
            default: return null;
        }
    }
}

const mapStateToProps = state => ({
    initialValues: state.config.initialValues,
    settingsForm: state.config.settingsForm,
});

export default connect(mapStateToProps, null)(Form)