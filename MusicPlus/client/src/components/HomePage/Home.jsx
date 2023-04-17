import React, {createContext, useContext} from "react";
import Layout from "../Layout/Layout.jsx";
import Carousel from "react-bootstrap/Carousel";
import downloadImage from "../../../public/download.jpg";
import code_structure from "../../../public/code_structure.png";
import HomeActionSlide from "./HomeActionSlide.jsx";

function Home(){

    return (
        <>
            <Layout>
                <div className={"container-home"}>
                    <div className={"container-content-header"}>
                        <h1>Explore</h1>
                    </div>
                    <hr/>
                    <div className={"container-content-actionSlide"}>
                        <HomeActionSlide/>
                    </div>
                    <hr/>
                    <div className={"container-content-recommendation"}>
                        <h1>Recommendation</h1>
                    </div>


                </div>
            </Layout>
        </>
    )
}

export default Home;