import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const ECContext = createContext()

/*
 This component establishes what data can be used.
 */
export const ECProvider = (props) => {
    const [ECs, setECs] = useState([])
    const userId = parseInt(localStorage.getItem("cosplayerId"))

    const getECs = () => {
        return fetch(`http://localhost:8088/eventCosplays?userId=${userId}&_expand=event&_expand=cosplay`)
            .then(res => res.json())
            .then(setECs)
    }

    const addEC = EC => {
        return fetch("http://localhost:8088/eventCosplays", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(EC)
        })
            .then(getECs)
    }

    const getECById = (id) => {
        return fetch(`http://localhost:8088/eventCosplays/${id}`)
            .then(res => res.json())
    }

    const removeEC = EC => {
        return fetch(`http://localhost:8088/eventCosplays/${EC.id}`, {
            method: "DELETE"
        })
            .then(getECs)
    }

    const editEC = EC => {
        return fetch(`http://localhost:8088/eventCosplays/${EC.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(EC)
        })
            .then(getECs)
    }

    return (
        <ECContext.Provider value={{
            ECs, getECs, addEC, getECById, removeEC, editEC
        }}>
            {props.children}
        </ECContext.Provider>
    )
}