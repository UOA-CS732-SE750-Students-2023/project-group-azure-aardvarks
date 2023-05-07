import React, {useContext, useEffect, useState} from "react";

import './LoginForm.css';


import PlayerContext from "../../utils/AppContextProvider.jsx";
import LoginForm from "./LoginForm.jsx";



function Login(){
    const { setShowPlayer } = useContext(PlayerContext);

    useEffect(() => {
        setShowPlayer(true);
        return () => {
            setShowPlayer(false);
        };
    }, [setShowPlayer]);
    return (
        <>
                <div className={"container-login"} style={{
                }}>
                    <LoginForm />
                </div>
        </>
    )
}

export default Login;
