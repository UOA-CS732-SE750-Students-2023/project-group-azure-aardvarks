import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter, HashRouter} from "react-router-dom";
import {UserProvider} from "./utils/AppContextProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
        <HashRouter >
            <App />
        </HashRouter>
    </UserProvider>
)
