import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const CosplayContext = createContext()

/*
 This component establishes what data can be used.
 */
export const CosplayProvider = (props) => {
    //defines state and logged in user
    const [cosplays, setCosplays] = useState([])
    const userId = parseInt(localStorage.getItem("cosplayerId"))

    //gets all of the user's cosplays
    const getCosplays = () => {
        return fetch(`http://localhost:8088/cosplays?userId=${userId}`)
            .then(res => res.json())
            .then(setCosplays)
    }

    //adds cosplay to database
    const addCosplay = cosplay => {
        return fetch("http://localhost:8088/cosplays", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cosplay)
        })
            .then(getCosplays)
    }

    //get specific cosplay from database
    const getCosplayById = (id) => {
        return fetch(`http://localhost:8088/cosplays/${id}`)
            .then(res => res.json())
    }

    //gets specific cosplay from database with items embedded
    const getCosplayByIdWithItems = (url) => {
        return fetch(`http://localhost:8088/cosplays?${url}&_embed=items`)
            .then(res => res.json())
    }

    //deletes cosplay from database
    const removeCosplay = cosplay => {
        return fetch(`http://localhost:8088/cosplays/${cosplay.id}`, {
            method: "DELETE"
        })
            .then(getCosplays)
    }

    //updates cosplay info in database
    const editCosplay = cosplay => {
        return fetch(`http://localhost:8088/cosplays/${cosplay.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cosplay)
        })
            .then(getCosplays)
    }

    return (
        <CosplayContext.Provider value={{
            cosplays, getCosplays, addCosplay, getCosplayById, removeCosplay, editCosplay, getCosplayByIdWithItems
        }}>
            {props.children}
        </CosplayContext.Provider>
    )
}