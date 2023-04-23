import React from 'react';
import "./index.scss"
import {useNavigate} from "react-router-dom";

const NotFount = ()=>{
    const navigate = useNavigate()
    return (
        <div style={{background: "#81D8D0"}}>
            <nav>
                <div className="menu">
                    <p className="website_name">LOGO</p>
                    <div className="menu_icon">
                        <span className="icon"></span>
                    </div>
                </div>
            </nav>

            <section className="wrapper">

                <div className="container">

                    <div id="scene" className="scene" data-hover-only="false">


                        <div className="circle" data-depth="1.2"></div>

                        <div className="one" data-depth="0.9">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>

                        <div className="two" data-depth="0.60">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>

                        <div className="three" data-depth="0.40">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>

                        <p className="p404" data-depth="0.50">404</p>
                        <p className="p404" data-depth="0.10">404</p>

                    </div>

                    <div className="text">
                        <article>
                            <button onClick={()=>navigate("/home")}>BACK TO HOME PAGE</button>
                        </article>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default NotFount;