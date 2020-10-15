import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const EssentialContext = createContext()

/*
 This component establishes what data can be used.
 */
export const EssentialProvider = (props) => {
    const [essentials, setEssentials] = useState([])
    const userId = parseInt(localStorage.getItem("cosplayerId"))

    const getEssentials = () => {
        return fetch(`http://localhost:8088/essentials?userId=${userId}`)
            .then(res => res.json())
            .then(setEssentials)
    }

    const addEssential = essential => {
        return fetch("http://localhost:8088/essentials", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(essential)
        })
            .then(getEssentials)
    }

    const getEssentialById = (id) => {
        return fetch(`http://localhost:8088/essentials/${id}`)
            .then(res => res.json())
    }

    const removeEssential = essential => {
        return fetch(`http://localhost:8088/essentials/${essential.id}`, {
            method: "DELETE"
        })
            .then(getEssentials)
    }

    const editEssential = essential => {
        return fetch(`http://localhost:8088/essentials/${essential.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(essential)
        })
            .then(getEssentials)
    }

    return (
        <EssentialContext.Provider value={{
            essentials, getEssentials, addEssential, getEssentialById, removeEssential, editEssential
        }}>
            {props.children}
        </EssentialContext.Provider>
    )
}