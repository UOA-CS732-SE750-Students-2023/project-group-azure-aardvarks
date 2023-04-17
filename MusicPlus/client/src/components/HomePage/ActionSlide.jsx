import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import downloadImage from '../../../public/download.jpg';
import code_structure from '../../../public/code_structure.png';
import Layout from "../Layout/Layout.jsx";

function ActionSlide(){
    return (
        <>
            <Carousel variant={"dark"}>
                <Carousel.Item interval={1000}>
                    <img
                        height={400}
                        className="d-block w-100"
                        src={code_structure}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1000}>
                    <img
                        height={400}
                        className="d-block w-100"
                        src={code_structure}
                        alt="First slide"
                    />
                </Carousel.Item>

            </Carousel>
        </>
    );
}

export default ActionSlide;