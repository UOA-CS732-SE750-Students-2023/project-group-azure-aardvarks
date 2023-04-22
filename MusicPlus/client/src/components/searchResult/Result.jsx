import Layout from "../Layout/Layout.jsx";
import React, { useEffect, useState } from 'react';

export default function Result() {
    const [params, setParams] = useState({});

    useEffect(() => {
        setParams(extractParamsFromUrl());
    }, [params]);

    return (
        <Layout>
            <div>
                <h1>Search Page</h1>
                <p>Search Term: {params.searchTerm}</p>
            </div>
        </Layout>
    );
}

function extractParamsFromUrl() {
    const hash = window.location.hash;
    const searchTerm = hash.split('/').pop();

    return {
        searchTerm: decodeURIComponent(searchTerm),
    };
}
