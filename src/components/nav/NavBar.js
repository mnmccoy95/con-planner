import React, {useRef} from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    const history = useHistory();
    const existDialog = useRef()

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

    function myFunction2() {
        var x = document.getElementById("myTopnav");
        if(x){
        if (x.className === "navbar") {
        } else {
          x.className = "navbar";
        }
        }
    }

    // When the user scrolls the page, execute myFunction
    window.onscroll = function() {myFunction3()};

    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction3() {
        // Get the navbar
        var navbar = document.getElementById("myTopnav");
        // Get the offset position of the navbar
        var sticky = navbar.offsetTop;
        if (window.pageYOffset > sticky) {
            navbar.classList.add("sticky")
        } else {
            navbar.classList.remove("sticky");
        }
    }

    return (
        <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        <div className="navbar" id="myTopnav">
                <Link className="navbarHome" onClick={e => myFunction2()} to="/">Home</Link>
                <Link className="navbarEtc" onClick={e => myFunction()} to="/events">Events</Link>
                <Link className="navbarEtc" onClick={e => myFunction()} to="/cosplays">Cosplays</Link>
                <Link className="navbarEtc" onClick={e => myFunction()} to="/essentials">Essentials</Link>
                <Link className="navbarEtc" onClick={e => myFunction()} to="#" onClick={()=>{
                    existDialog.current.showModal()
                }
                }>Logout</Link>
            <a href={() => false} className="icon" onClick={e => myFunction()}>
                <i className="fa fa-bars"></i>
            </a>
        </div>
        <dialog className="logout--dialog" ref={existDialog}>
            <div>Are you sure you want to logout?</div>
            <button className="logout--yes" onClick={() => {
                    const userId = localStorage.getItem("cosplayerId");
                    localStorage.clear(userId);
                    history.push("/");
                }}>Logout</button>
            <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
        </dialog>
        
        </>
    )
}