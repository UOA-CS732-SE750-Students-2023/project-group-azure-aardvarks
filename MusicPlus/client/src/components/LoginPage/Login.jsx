import React from "react";
import Layout from "../Layout/Layout.jsx";
import LoginForm from "./LoginForm.jsx";



function Login(){
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