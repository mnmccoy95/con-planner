import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    const history = useHistory();
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/events">Events</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/cosplays">Cosplays</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/essentials">Essentials</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/" onClick={()=>{
                    const userId = localStorage.getItem("cosplayerId");
                    localStorage.clear(userId);
                    history.push("/");}
                }>Logout</Link>
            </li>
        </ul>
    )
}