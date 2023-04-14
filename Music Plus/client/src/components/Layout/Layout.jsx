import React, {useEffect, useState} from "react";
import LayoutHeader from "./LayoutHeader.jsx";
import LayoutFooter from "./LayoutFooter.jsx";
import LayoutContent from "./LayoutContent.jsx";


function Layout(props){
    const [device, setDevice] = useState("pc");

    const handleResize = () =>{
        const clientWidth = document.documentElement.clientWidth
        const clientHeight = document.documentElement.clientHeight
        if (clientWidth < 1000){
            // Pad device
            console.log("pad device")
        } else if(clientWidth < 500){
            // Phone device
            console.log("mobile device")
        }else{
            // Pc device
            console.log("pc device")
        }
    }

    // Detach your device
    handleResize()

    useEffect(()=>{
        window.addEventListener('resize',handleResize.bind())
    },[])

    return (
        <div className={"layout-container"} style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            backgroundColor:"lightgray"
        }}>
            <div>
                <LayoutHeader/>
            </div>

            <div className={"layout-content"} style={{
                margin: "0 auto",
                width: 1000,
                height: "100%",
                backgroundColor: "white",
                borderLeft: "solid",
                borderRight: "solid",
                borderWidth: 1
            }}>
                {/*content components*/}
                {props.children}
            </div>

            <div className={"layout-footer"} style={{
                position: "fixed",
                bottom: 0,
                height:100,
                width: "100%",
                borderTop:"solid",
                borderBlockWidth:"1px",
                backgroundColor:"red"
            }}>
                <LayoutFooter/>
            </div>
        </div>
    )
}

export default Layout;