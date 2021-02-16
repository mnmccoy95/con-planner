import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

//verifies that a user is logged in before directing them to the rest of the site
export const ConPlanner = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("cosplayerId")) {
                return (
                    <>
                    <NavBar />
                    <ApplicationViews />  
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login">
			<Login />
        </Route>
        <Route path="/register">
			<Register />
        </Route>
    </>
)