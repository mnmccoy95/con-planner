import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const EventContext = createContext()

/*
 This component establishes what data can be used.
 */
export const EventProvider = (props) => {
    const [events, setEvents] = useState([])
    const userId = parseInt(localStorage.getItem("cosplayerId"))

    const getEvents = () => {
        return fetch(`http://localhost:8088/events?userId=${userId}`)
            .then(res => res.json())
            .then((response) => {
                //sorts events by date oldest to newest
                function compare(a, b) {
                    const eventA = a.startDate
                    const eventB = b.startDate
                        
                    let comparison = 0;
                    if (eventA > eventB) {
                      comparison = 1;
                    } else if (eventA < eventB) {
                      comparison = -1;
                    }
                    return comparison *1;
                  }
                  response.sort(compare)
                  setEvents(response)
            })
    }

    const addEvent = event => {
        return fetch("http://localhost:8088/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
            .then(getEvents)
    }

    const getEventById = (id) => {
        return fetch(`http://localhost:8088/events/${id}`)
            .then(res => res.json())
    }

    const deleteEvent = eventId => {
        return fetch(`http://localhost:8088/events/${eventId}`, {
            method: "DELETE"
        })
            .then(getEvents)
    }

    const updateEvent = event => {
        return fetch(`http://localhost:8088/events/${event.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(event)
        })
            .then(getEvents)
    }

    return (
        <EventContext.Provider value={{
            events, getEvents, addEvent, getEventById, deleteEvent, updateEvent
        }}>
            {props.children}
        </EventContext.Provider>
    )
}