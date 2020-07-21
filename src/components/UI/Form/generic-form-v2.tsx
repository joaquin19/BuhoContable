import React, { Component } from 'react'; //useState
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import { GenericComponentEnum, LayoutComponentEnum, GroupedComponentEnum, NavigationComponentEnum, ControlComponentEnum } from '../../../types/enums/generic-form';
import { Container, Col, Input, Label, FormGroup, Button, Row } from 'reactstrap';
import JoditEditor from 'jodit-react';

/*
* GenericComponent
    + LayoutComponent
        - Row
        - Col

    + GroupedComponent
        - Fieldset

    + NavigationComponent
        - Tab  {tabNumber, tab.tabName, tabContent}

    + ControlComponent
        - Input
        - Select

*/

interface Frm {
    name: string;
    placeholder: string;
    field: string;
    type: string;
    label: string;
    options?: Array<{ text: string, option: string }>;
}

interface Props extends React.Props<GenericFormV2> {
    titleForm?: string;
    inputsForm?: Array<Frm>;
    onSubmit?: (data) => void;
    buttonName?: string;
    settingsForm?: any;
    icon?: string;
    values?: any;
    initialValues?: any;
    handleSubmit?: any;
    pristine?: any
    submitting?: any
}

const InputField = (props: any) => {
    const { label, type, placeholder, input, meta: { touched, error }, enable } = props;
    var content = '';
    const config = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        width: '100%'
    }

    return (
        type === 'checkbox' ?
            <div className="custom-control custom-checkbox">
                <input
                    className={'custom-control-input' + ((touched && error !== undefined) ? ' is-invalid' : (touched && error === undefined) ? ' is-valid' : '')}
                    type={type}
                    name={input.name}
                    id={input.name}
                    placeholder={placeholder}
                    style={{ fontSize: '13px' }}
                    {...input} enable={enable ? true : false} disabled={enable ? false : true}
                    title={error !== undefined || error !== "" ? error : ""}

                />
                <Label className="custom-control-label" for={input.name}>{label}</Label>
            </div> :
            type === 'hidden' ?
                <Input
                    className={((touched && error !== undefined) ? 'is-invalid' : (touched && error === undefined) ? 'is-valid' : '')}
                    type={type}
                    name={input.name}
                    id={input.name}
                    placeholder={placeholder}
                    style={{ fontSize: '13px' }}
                    {...input} enable={enable ? true : false} disabled={enable ? false : true}
                    title={error !== undefined || error !== "" ? error : ""}
                /> :
                type === 'textArea' ?
                    <div className="row" style={{ width: '100%', marginTop: '20px' }}>
                        <Label for={input.name}>{label}</Label><br />
                        <div
                            className={'form-control' + ((touched && error !== undefined) ? ' is-invalid' : (touched && error === undefined) ? ' is-valid' : '')}
                            style={{ padding: '0px', height: '100%', width: '100%', paddingRight: '40px' }}
                            title={error !== undefined || error !== "" ? error : ""}>
                            <textarea
                                style={{ width: '100%' }}
                                className={((touched && error !== undefined) ? 'is-invalid' : (touched && error === undefined) ? 'is-valid' : '')}
                                title={error !== undefined || error !== "" ? error : ""} enable={enable ? true : false} disabled={enable ? false : true}
                                {...input} name={input.name} cols={150} rows={15}></textarea>
                        </div>
                    </div>
                    :
                    type === 'textAreaV2' ?
                        <div className="row" style={{ width: '100%', marginTop: '20px' }}>
                            <Label for={input.name}>{label}</Label><br />
                            <JoditEditor
                                value={content}
                                config={config}
                                onBlur={newContent => { console.log(newContent) }} //setContent(newContent) preferred to use only this option to update the content for performance reasons
                                onChange={e => {
                                    input.onChange(e);
                                }} />
                        </div>
                        :
                        <FormGroup>
                            <Label for={input.name}>{label}</Label><br />
                            {type === 'file' ? <Input
                                type={type}
                                placeholder={placeholder}
                                Style={{ fontSize: '13px' }}
                                name={input.name}
                                onChange={
                                    (e) => {
                                        e.preventDefault();
                                        const files = e.target.files[0];
                                        input.onChange(files);
                                    }
                                }
                                enable={enable ? true : false} disabled={enable ? false : true}
                            /> :
                                <Input
                                    className={((touched && error !== undefined) ? 'is-invalid' : (touched && error === undefined) ? 'is-valid' : '')}
                                    type={type}
                                    name={input.name}
                                    id={input.name}
                                    placeholder={placeholder}
                                    style={{ fontSize: '13px' }}
                                    {...input} enable={enable ? true : false} disabled={enable ? false : true}
                                    title={error !== undefined || error !== "" ? error : ""}
                                />}
                        </FormGroup>
    )
}

const SelectField = (props: any) => {
    const { label, options, placeholder, input, meta: { touched, error }, onChange, enable } = props;
    return (
        <FormGroup>
            <Label for={input.name}>{label}</Label>
            <div
                className={'form-control' + ((touched && error !== undefined) ? ' is-invalid' : (touched && error === undefined) ? ' is-valid' : '')}
                style={{ padding: '0px' }}
                title={error !== undefined || error !== "" ? error : ""}
            >
                <Select2
                    className="form-control"
                    name={input.name}
                    id={input.name}
                    style={{ width: '100%' }}
                    defaultValue={input.value}
                    data={options}
                    onChange={{ onChange }}
                    options={{ placeholder }}
                    {...input} enable={enable ? true : false} disabled={enable ? false : true}
                    title={error !== undefined || error !== "" ? error : ""}
                />
            </div>
        </FormGroup>
    )
}

const LayoutComponent = (component: any, props: any, obj: any, isEditable: boolean) => {
    switch (component.componentType) {
        case (LayoutComponentEnum.Container):
            return (<Container fluid={component.className === 'container-fluid' ? true : false}>{component.childs && RenderComponent(component.childs, props, obj, isEditable)}</Container>)
        case (LayoutComponentEnum.Row):
            return (<Row Style={component.style ? component.style : ''} className={component.className ? component.className : ''}>{component.childs && RenderComponent(component.childs, props, obj, isEditable)}</Row>)
        case (LayoutComponentEnum.Col):
            return (<Col className={component.className ? component.className : ''}>{component.childs && RenderComponent(component.childs, props, obj, isEditable)}</Col>)
    }
}

const GroupedComponent = (component: any, props: any, obj: any, isEditable: boolean) => {
    switch (component.componentType) {
        case (GroupedComponentEnum.Fieldset):
            return (
                <fieldset>
                    <legend>{component.label ? component.label : ''}</legend>
                    {component.childs && RenderComponent(component.childs, props, obj, isEditable)}
                </fieldset>
            )
    }
}

const NavigationComponent = (component: any, props: any, obj: any, isEditable: boolean) => {
    switch (component.componentType) {
        case (NavigationComponentEnum.Tab):

            return (
                <>
                    <div className="container-fluid">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            {component.childs && component.childs.map((tab, key) => (
                                <li key={key} className="nav-item" style={{ maxHeight: '60px' }}>
                                    <a className={tab.tabNumber === 1 ? 'nav-link active' : 'nav-link'} id={'nav-' + tab.tabNumber + '-tab'} data-toggle="tab"
                                        href={'#nav-' + tab.tabNumber} role="tab" aria-controls="home" aria-selected="true">{tab.tabName}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="container-fluid">
                        <div className="tab-content" id="nav-tabContent" style={{ minHeight: '400px' }}>
                            {component.childs && component.childs.map((tab, key) => (
                                <div className={tab.tabNumber === 1 ? 'tab-pane fade show active' : 'tab-pane fade show'}
                                    id={'nav-' + tab.tabNumber} role="tabpanel" aria-labelledby={tab.tabNumber + '-tab'}>
                                    {RenderComponent(tab.tabContent, props, obj, isEditable)}
                                </div>
                            ))}
                        </div>
                    </div>
                </>)
    }
}

const ControlComponent = (component: any, props: any, obj: any, isEditable: boolean) => {
    switch (component.componentType) {
        case (ControlComponentEnum.Input):
            return (<Field
                validate={component.validations != null && component.validations.length > 0 ? component.validations : []}
                component={InputField}
                name={component.name}
                type={component.type}
                enable={component.isEditable != null ? component.isEditable : isEditable}
                placeholder={component.placeholder}
                label={component.label} isEditable={isEditable} />)
        case (ControlComponentEnum.Select):
            return (
                <Field
                    validate={component.validations != null && component.validations.length > 0 ? component.validations : []}
                    name={component.name}
                    options={component.options}
                    component={SelectField}
                    onChange={component.onChange}
                    style={component.style === undefined ? '' : component.style}
                    placeholder={component.placeholder}
                    label={component.label}
                    enable={component.isEditable != null ? component.isEditable : isEditable}
                > </Field>
            )
    }
}

const GenericComponent = (component: any, props: any, obj: any, isEditable: boolean) => {
    switch (component.groupType) {
        case (GenericComponentEnum.GenericComponent):
            return GenericComponent(component, props, obj, isEditable);
        case (GenericComponentEnum.LayoutComponent):
            return LayoutComponent(component, props, obj, isEditable);
        case (GenericComponentEnum.GroupedComponent):
            return GroupedComponent(component, props, obj, isEditable);
        case (GenericComponentEnum.NavigationComponent):
            return NavigationComponent(component, props, obj, isEditable);
        case (GenericComponentEnum.ControlComponent):
            return ControlComponent(component, props, obj, isEditable);
    }
}

export const RenderComponent = (component: any, props: any, obj: any, isEditable: boolean) => {
    if (Array.isArray(component)) { // Is Array 
        return component.map((comp, key) => (
            RenderComponent(comp, props, obj, isEditable)
        ))
    }
    else {// Object
        return GenericComponent(component, props, obj, isEditable);
    }
}

class GenericFormV2 extends Component<Props> {
    render() {
        const { handleSubmit, settingsForm, pristine, submitting } = this.props;
        const { titleForm, icon, inputsForm, onSubmit, buttonName } = settingsForm;

        return (
            <div id="panel-2" className="panel col-12">
                <div className="panel-hdr">
                    <h2>
                        {titleForm} {icon ? <span className="fw-300"><i className={`fas ${icon}`}></i></span> : null}
                    </h2>
                </div>
                <div className="panel-container show">
                    <div className="panel-content">
                        <form>
                            {RenderComponent(inputsForm, this.props, null, false)}
                            <div className='row'>
                                <div className='col-md-4'></div>
                                <div className='col-md-4 text-center mb-5'>
                                    <Button disabled={pristine || submitting} onClick={handleSubmit(onSubmit)}>{buttonName}</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        initialValues: state.waves.initialValues,
        settingsForm: state.waves.settingsForm,
    };
}

export default connect(mapStateToProps, null)(reduxForm({ form: 'GenericFormV2' })(GenericFormV2))
