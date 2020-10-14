import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
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
                <Link className="navbar__link" to="/logout">Logout</Link>
            </li>
        </ul>
    )
}