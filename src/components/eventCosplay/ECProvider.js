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

    const getECs = (eventId) => {
        return fetch(`http://localhost:8088/eventCosplays?eventId=${parseInt(eventId)}&_expand=cosplay`)
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

    const removeEC = (cosplayId, eventId) => {
        fetch(`http://localhost:8088/eventCosplays?cosplayId=${cosplayId}&eventId=${eventId}`)
        .then(res => res.json())
        .then((response) => {
            if(response.length === 1){
            return fetch(`http://localhost:8088/eventCosplays/${response[0].id}`, {
            method: "DELETE"
            })}
            else{
                const match = response.find(EC => { return EC.eventId === eventId && EC.cosplayId === cosplayId})
                return fetch(`http://localhost:8088/eventCosplays/${match.id}`, {
                method: "DELETE"
            })}
        }).then(()=>{getECs(eventId)})
    }

    return (
        <ECContext.Provider value={{
            ECs, getECs, addEC, removeEC, setECs
        }}>
            {props.children}
        </ECContext.Provider>
    )
}