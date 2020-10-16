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
    const [cosplays, setCosplays] = useState([])
    const userId = parseInt(localStorage.getItem("cosplayerId"))

    const getCosplays = () => {
        return fetch(`http://localhost:8088/cosplays?userId=${userId}`)
            .then(res => res.json())
            .then(setCosplays)
    }

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

    const getCosplayById = (id) => {
        return fetch(`http://localhost:8088/cosplays/${id}`)
            .then(res => res.json())
    }

    const getCosplayByIdWithItems = (id) => {
        return fetch(`http://localhost:8088/cosplays/${id}?_embed=items`)
            .then(res => res.json())
    }

    const removeCosplay = cosplay => {
        return fetch(`http://localhost:8088/cosplays/${cosplay.id}`, {
            method: "DELETE"
        })
            .then(getCosplays)
    }

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