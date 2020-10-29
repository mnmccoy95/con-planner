import React, {useRef} from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    //used for navigating pages
    const history = useHistory()
    //used for displaying logout dialog
    const existDialog = useRef()

    //adds responsive class when hamburger is clicked
    function myFunction() {
        var x = document.getElementById("myTopnav");
        if(x){
            if (x.className === "navbar") {
            x.className += " responsive";
            } else {
            x.className = "navbar";
            }
        }
    }

    //removes responsive class when any other nav element is clicked
    function myFunction2() {
        var x = document.getElementById("myTopnav");
        if(x){
            if (x.className === "navbar") {
            } else {
            x.className = "navbar";
            }
        }
    }

    //defines and returns html for navbar
    return (
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <dialog className="logout--dialog" ref={existDialog}>
            <div>Are you sure you want to logout?</div>
            <button className="logout--yes" onClick={() => {
                const userId = localStorage.getItem("cosplayerId");
                localStorage.clear(userId);
                history.push("/");
            }}>Logout</button>
            <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
        </dialog>
        <div className="navbar" id="myTopnav">
            <Link className="navbarHome" onClick={e => myFunction2()} to="/">Home</Link>
            <Link className="navbarEtc" onClick={e => myFunction2()} to="/events">Events</Link>
            <Link className="navbarEtc" onClick={e => myFunction2()} to="/cosplays">Cosplays</Link>
            <Link className="navbarEtc" onClick={e => myFunction2()} to="/essentials">Essentials</Link>
            <Link className="navbarEtc" onClick={e => myFunction2()} to="#" onClick={()=>{
                existDialog.current.showModal()}
            }>Logout</Link>
            <a href="#/" className="icon" onClick={e => myFunction()}>
                <i className="fa fa-bars"></i>
            </a>
        </div>
        </>
    )
}