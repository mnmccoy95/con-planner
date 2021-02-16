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
    //defines initial state of event-essentials
    const [EEs, setEEs] = useState([])

    //gets all event-essentials for relevant event
    const getEEs = (eventId) => {
        return fetch(`http://localhost:8088/eventEssentials?eventId=${parseInt(eventId)}&_expand=essential`)
            .then(res => res.json())
            .then(setEEs)
    }

    //gets ALL event-essential relationships
    const getAllEEs = () => {
        return fetch(`http://localhost:8088/eventEssentials`)
            .then(res => res.json())
    }

    //adds new event-essential relationship
    const addEE = EE => {
        return fetch("http://localhost:8088/eventEssentials", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(EE)
        }).then(getEEs(EE.eventId))
    }

    //deletes event-essential relationship
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