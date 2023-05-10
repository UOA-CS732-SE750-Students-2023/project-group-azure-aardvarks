import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import downloadImage from '../../../public/download.jpg';
import code_structure from '../../../public/code_structure.png';
import Layout from "../Layout/Layout.jsx";
import { BACKEND_API } from "../../utils/env.js";
import { useState, useEffect} from "react";

function ActionSlide() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/album/list?limit=5")
            .then(response => response.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error(error));
    }, []);

    const coverUrls = products.map(product => product.coverUrl);

    return (
        <>
            <Carousel variant={"dark"}>
            {coverUrls.map(coverUrl => (
                    <Carousel.Item interval={1000}>
                    <img
                        style={{ maxWidth: '30%', maxHeight: '30%' }}
                        className="mx-auto d-block"
                        src={coverUrl}
                        alt="First slide"
                    />
                </Carousel.Item>
       
                ))}
            </Carousel>
        </>
    );
}

export default ActionSlide;