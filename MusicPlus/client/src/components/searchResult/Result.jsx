import Layout from "../Layout/Layout.jsx";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import {BACKEND_API} from "../../utils/env.js";
import {useToast} from "../../utils/AppContextProvider.jsx";
import { useLocation } from "react-router-dom";
import {ListGroup, Row} from "react-bootstrap";

export default function Result() {
    const [searchTerm, setSearchTerm] = useState('');
    const [result, setResult] = useState(null)
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const extractedSearchTerm = extractSearchTermFromUrl(location);
        setSearchTerm(extractedSearchTerm);

        const getResult = async () => {
            try {
                await axios.get(`${BACKEND_API}/api/search/search/${extractedSearchTerm}/${0}/${10}`).then(response => {
                    setResult(response.data.data.song)
                    console.log(response.data.data.song)
                    setIsLoading(false);
                });
            } catch (error) {
                console.log(error);
                addToast("search music error! Please contect us! We will fix it ASAP!")
            }
        };
        getResult()

    }, [location]);


    return (
        <Layout>
            <div>
                <h1>Search Page</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ListGroup>
                    {result.map((song) =>
                        <ListGroup.Item key={song.id}> {song.name} </ListGroup.Item>
                    )}
                </ListGroup>
                )}


            </div>
        </Layout>
    );
}

function extractSearchTermFromUrl(location) {
    const hash = location.pathname;
    return decodeURIComponent(hash.split('/').pop());
}
