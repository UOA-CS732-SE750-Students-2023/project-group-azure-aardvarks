import React from "react";
import Layout from "../Layout.jsx";
import Carousel from "react-bootstrap/Carousel";
import downloadImage from "../../../../public/download.jpg";
import code_structure from "../../../../public/code_structure.png";
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