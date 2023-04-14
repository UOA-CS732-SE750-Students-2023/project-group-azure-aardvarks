import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import downloadImage from '../../../../public/download.jpg';
import code_structure from '../../../../public/code_structure.png';
import Layout from "../Layout.jsx";

function HomeActionSlide(){
    return (
        <>
            <div style={{textAlignLast: "center"}}>

                <Carousel variant={"dark"} >
                    <Carousel.Item interval={1000} >
                        <img src={downloadImage} alt={"asd"}/>
                    </Carousel.Item>

                    <Carousel.Item interval={1000}>
                        <img src={code_structure} alt={"asd"}/>
                    </Carousel.Item>
                </Carousel>
                <hr/>
            </div>
        </>
    );
}

export default HomeActionSlide;