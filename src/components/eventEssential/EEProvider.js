import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const EEContext = createContext()

/*
 This component establishes what data can be used.
 */
export const EEProvider = (props) => {
    const [EEs, setEEs] = useState([])

    const getEEs = (eventId) => {
        return fetch(`http://localhost:8088/eventEssentials?eventId=${parseInt(eventId)}&_expand=essential`)
            .then(res => res.json())
            .then(setEEs)
    }

    const getAllEEs = () => {
        return fetch(`http://localhost:8088/eventEssentials`)
            .then(res => res.json())
    }

    const addEE = EE => {
        return fetch("http://localhost:8088/eventEssentials", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(EE)
        }).then(getEEs(EE.eventId))
    }

    const removeEE = (EE) => {
        return fetch(`http://localhost:8088/eventEssentials/${EE.id}`, {
            method: "DELETE"
        }).then(getEEs(EE.eventId))
    }

    return (
        <EEContext.Provider value={{
            EEs, getEEs, addEE, removeEE, setEEs, getAllEEs
        }}>
            {props.children}
        </EEContext.Provider>
    )
}