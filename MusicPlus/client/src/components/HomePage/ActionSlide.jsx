import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import downloadImage from '../../../public/download.jpg';
import code_structure from '../../../public/code_structure.png';
import Layout from "../Layout/Layout.jsx";
import { BACKEND_API } from "../../utils/env.js";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function ActionSlide() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    

    useEffect(() => {
        fetch("http://localhost:4000/album/list?limit=5")
            .then(response => response.json())
            .then(data => setProducts(data.products))
            .catch(error => console.error(error));
    }, []);

    const coverUrls = products.map(product => product.coverUrl);
    const albumIds = products.map(product => product.albumId);

    const handleImageClick = (albumId) => {
        navigate(`/album/${albumId}`);
    }

    return (
        <>
            <Carousel variant={"dark"}>
                {coverUrls.map((coverUrl, index) => (
                    <Carousel.Item interval={2000} key={index}>
                        <img
                            style={{ maxWidth: '30%', maxHeight: '30%', cursor: 'pointer' }}
                            className="mx-auto d-block"
                            src={coverUrl}
                            alt="First slide"
                            onClick={() => handleImageClick(albumIds[index])}

                        />
                    </Carousel.Item>

                ))}
            </Carousel>
        </>
    );
}

export default ActionSlide;