import React, { useRef } from "react"
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'
import "./Login.css"

export const Login = props => {

    //define relevant info
    const history = useHistory()
    const email = useRef()
    const password = useRef()
    const existDialog = useRef()
    const passwordDialog = useRef()

    //checks if user exists in database
    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => user.length ? user[0] : false)
    }

    //logs in user given that they exist and password is correct
    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    localStorage.setItem("cosplayerId", exists.id)
                    history.push("/")
                } else if (exists && exists.password !== password.current.value) {
                    passwordDialog.current.showModal()
                } else if (!exists) {
                    existDialog.current.showModal()
                }
            })
    }

    //defines html for login form
    return (
        <main className="container--login">
            <dialog className="logout--dialog" ref={existDialog}>
                <div>User does not exist</div>
                <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>
            <dialog className="logout--dialog" ref={passwordDialog}>
                <div>Password does not match</div>
                <button className="logout--no" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <section className="loginscreen">
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Pros of Cons</h1>
                    <h2>Sign in to get plannin'!</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input ref={email} type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="add signin">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link className="registerLink" to="/register">Cosplay with us!</Link>
            </section>
        </main>
    )
}

