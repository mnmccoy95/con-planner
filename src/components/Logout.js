import React from "react"
import { useHistory } from "react-router-dom"

export const Logout = () => {
    const history = useHistory();
    const userId = localStorage.getItem("cosplayerId");
    localStorage.clear(userId);
    history.push("/");
}