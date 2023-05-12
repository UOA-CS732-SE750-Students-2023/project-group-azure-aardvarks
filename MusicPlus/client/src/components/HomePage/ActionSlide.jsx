import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import { BACKEND_API, NETEASY_API } from "../../utils/env.js";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './MyCarousel.css';


function ActionSlide() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        async function fetchData() {
          try {
            const response = await fetch(`${BACKEND_API}/api/playList/randomEnglish`);
            const data = await response.json();
            setProducts(data.data.data.albums);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, []);

    const coverUrls = products.map(product => product.picUrl);
    const albumIds = products.map(product => product.id);

    const handleImageClick = (albumId) => {
        navigate(`/album/${albumId}`);
    }

    return (
        <>
            <Carousel variant={"dark"}>
                {coverUrls.map((coverUrl, index) => (
                    <Carousel.Item interval={2000} key={index}>
                        <div className="carousel-image-container" onClick={() => handleImageClick(albumIds[index])}>
                            <img
                                className="d-block blur-image "
                                src={coverUrl}
                                alt="No picture"
                            />
                            <img
                                style={{ maxWidth: '30%', maxHeight: '30%', cursor: 'pointer', objectFit: 'cover', zIndex: 100, position: "relative"}}
                                className="mx-auto d-block "
                                src={coverUrl}
                                alt="No picture"
                            />
                        </div>

                    </Carousel.Item>

                ))}
            </Carousel>
        </>
    );
}

export default ActionSlide;
