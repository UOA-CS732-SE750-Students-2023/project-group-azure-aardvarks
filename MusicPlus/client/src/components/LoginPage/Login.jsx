import React, {useContext, useEffect} from "react";
import Layout from "../Layout/Layout.jsx";
import LoginForm from "./LoginForm.jsx";
import PlayerContext from "../../utils/AppContextProvider.jsx";



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
            <Layout>
                <div className={"container-login"} style={{
                    display: "grid",
                    justifyContent: "center",
                    justifyItems: "stretch",
                    padding:40
                }}>
                    <LoginForm />
                </div>
            </Layout>
        </>
    )
}

export default Login;
