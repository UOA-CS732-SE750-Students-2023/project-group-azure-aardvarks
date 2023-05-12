import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter, HashRouter} from "react-router-dom";

import {
    NotificationProvider,
    PlayerProvider,
    TemporaryPlaylistProvider,
    UserProvider
} from "./utils/AppContextProvider";



ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
        <NotificationProvider>
            <PlayerProvider>
                <TemporaryPlaylistProvider>
                    <HashRouter>
                        <App />
                    </HashRouter>
                </TemporaryPlaylistProvider>
            </PlayerProvider>
        </NotificationProvider>
    </UserProvider>
)
