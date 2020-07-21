import React, { Component } from 'react'
import 'react-select2-wrapper/css/select2.css';

import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';

interface Props extends React.Props<ModalForm> {
    onClick?: () => void;
    title?: string;
    custom?: any;
    customBody?: any;
    body?: Array<any>;
    view: boolean;
}


export default class ModalForm extends Component<Props> {
    closeModal = () => {
        this.props.onClick();
    }

    render() {
        const { body, custom, customBody, view, title} = this.props;
        return (
            <Modal zIndex={2000} style={customBody ? {maxWidth: '60%'} : {}} isOpen={view}>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    {customBody ? customBody :
                        <div className='row'>
                        {body.map((label) => (
                            <div className='col-md-6'>
                            <Label className="font-weight-bold mr-2">{label.name}</Label>
                            {label.data}
                            </div>
                        ))}
                        </div>
                    }
                </ModalBody>
                <ModalFooter>
                    {custom ? custom :
                        <Button color="primary" onClick={this.closeModal}>Close</Button>
                    }
                </ModalFooter>
            </Modal>
        )
    }
}
