import React from "react"
import { useHistory } from "react-router-dom"

export const Logout = () => {

    const history = useHistory();
    const userId = localStorage.getItem("cosplayerId");
    const logout = () => {
        localStorage.clear(userId);
        history.push("/");
    }
        
    return (
        <>
            <button className="logout-btn" onClick={logout()}>Log Out</button>
        </>
    )
}