import React, { useEffect, useState } from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export const { signoutTime, warningTime } = window['runConfig'];

const LogoutPopup = (props) => {
    const [signout, setSignoutTime] = useState(signoutTime);
    const [warning, setWarningTime] = useState(warningTime);
    const [isOpen, setIsOpen] = useState(false);
    let warnTimeout;
    let logoutTimeout;

    const warn = () => {
        setIsOpen(true);
    };

    const logout = () => {
        //Aqui se realiza el logout despues de no haber contestado el login
        props.logout();
    };

    const stay = () => {
        setIsOpen(false);
        //Aqui se realiza la renovacion del token
        props.renew();
    }

    const setTimeouts = () => {
        warnTimeout = setTimeout(warn, warning);
        logoutTimeout = setTimeout(logout, signout);
    };

    const clearTimeouts = () => {
        if (warnTimeout) clearTimeout(warnTimeout);
        if (logoutTimeout) clearTimeout(logoutTimeout);
    };

    useEffect(() => {
        const events = [
            'load',
            'mousemove',
            'mousedown',
            'click',
            'scroll',
            'keypress'
        ];

        const resetTimeout = () => {
            clearTimeouts();
            setTimeouts();
        };

        for (let i in events) {
            window.addEventListener(events[i], resetTimeout);
        }

        setTimeouts();
        return () => {
            for(let i in events){
                window.removeEventListener(events[i], resetTimeout);
                clearTimeouts();
            }
        }
    },[]);


    return (
        <Modal zIndex={2000} isOpen={isOpen}>
            <ModalHeader>Due to idle time, your session is about to end.</ModalHeader>
            <ModalBody>You will be logged out. Do you want to stay?</ModalBody>
            <ModalFooter>
                <Button color="default" onClick={logout}>Logout</Button>
                <Button color="primary" onClick={stay}>Stay</Button>
            </ModalFooter>
        </Modal>
    )
}
export default LogoutPopup;