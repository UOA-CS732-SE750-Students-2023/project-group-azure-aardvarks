import {Route, Routes} from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "../components/HomePage/Home.jsx";
import Login from "../components/LoginPage/Login.jsx";
import NotFount from "../pages/404.jsx";
import Register from "../components/LoginPage/Register";



function RouterFunc() {
    return (
        <>
            <Routes >
                <Route path={"/register"} element={<Register/>}/>
                <Route index path="/home" element={<Home/>} exact/>
                <Route path={"/login"} element={<Login/>}/>

                <Route path={"*"} element={<NotFount/>}/>
            </Routes>
        </>
    )
}

export default RouterFunc