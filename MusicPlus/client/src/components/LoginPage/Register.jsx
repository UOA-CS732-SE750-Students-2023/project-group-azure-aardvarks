import React, {useContext, useEffect} from "react";
import Layout from "../Layout/Layout.jsx";
import PlayerContext from "../../utils/AppContextProvider.jsx";

function Register(){
    const { setShowPlayer } = useContext(PlayerContext);

    useEffect(() => {
        setShowPlayer(true);
        return () => {
            setShowPlayer(false);
        };
    }, [setShowPlayer]);
    return (
        <>
            <Layout>
                register page
            </Layout>
        </>
    )
}

export default Register
