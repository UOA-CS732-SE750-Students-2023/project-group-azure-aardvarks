import React, {createContext, useContext} from "react";
import Layout from "../Layout.jsx";
import Carousel from "react-bootstrap/Carousel";
import downloadImage from "../../../../public/download.jpg";
import code_structure from "../../../../public/code_structure.png";
import HomeActionSlide from "./HomeActionSlide.jsx";

function Home(){

    return (
        <>
            <Layout>
                <div className={"container-home"}>
                    <div className={"container-action-slide"}>
                        <HomeActionSlide/>
                    </div>


                </div>
            </Layout>
        </>
    )
}

export default Home;