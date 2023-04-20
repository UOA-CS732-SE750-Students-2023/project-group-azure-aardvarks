import React, {useContext, useState} from "react";
import Toast from 'react-bootstrap/Toast';
import {Button, Col, Row, ToastContainer} from "react-bootstrap";
import {NotificationContext, useToast} from "../../utils/AppContextProvider.jsx";
import {map} from "react-bootstrap/ElementChildren";


function GlobalNotification({toasts} ){
    // const {show, setShow} = useContext(NotificationContext)
    //
    // return (
    //     <>
    //     <ToastContainer position={'top-end'}>
    //     {[1,2].map((value, i)=>(
    //             <Toast onClose={()=>{setShow(false)}} show={show} delay={3000} key={i} >
    //                 <Toast.Header>
    //                     <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
    //                     <strong className="me-auto">Bootstrap</strong>
    //                     <small className="text-muted">just now</small>
    //                 </Toast.Header>
    //                 <Toast.Body>See? Just like this.sdfsdf
    //                     sadfsdfasdf
    //                     asdfasdf
    //                     asdfasdfasdfasdf
    //                     asdfasdfasd
    //                     <Button variant="link">Link</Button>
    //                 </Toast.Body>
    //             </Toast>
    //
    //     ))}
    //     </ToastContainer>
    //     </>
    // );
    const { removeToast } = useToast();
    const now = new Date();
    return (
        <ToastContainer position="top-end">
            {toasts.map(({ id, message, options }) => (
                <Toast
                    key={id}
                    onClose={() => removeToast(id)}
                    delay={options.delay || 3000}
                    autohide={options.autohide !== false}
                >
                    <Toast.Header>
                        <strong className="me-auto">Bootstrap</strong>
                        <small className="text-muted">{now.toLocaleString()}</small>
                    </Toast.Header>
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            ))}
        </ToastContainer>
    );
}

export default GlobalNotification
