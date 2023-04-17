import React, {useState} from "react";
import LoginForm from "../components/LoginPage/LoginForm.jsx";

// Manage the user's status
export const UserContext = React.createContext({})



/**
 * Put it to the Root component. Global user status management.
 * @param children  Root entry
 * @returns {JSX.Element}
 */
export function UserProvider({children}){
    const [userDetail, setUserDetail] = useState({})
    const context = {
        userDetail, setUserDetail
    }
    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    )
}
