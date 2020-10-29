import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const HotelContext = createContext()

/*
 This component establishes what data can be used.
 */
export const HotelProvider = (props) => {
    //sets initial state
    const [hotel, setHotel] = useState({})

    //gets specific hotel info by eventId
    const getHotelByEvent = (eventId) => {
        return fetch(`http://localhost:8088/hotels?eventId=${eventId}`)
            .then(res => res.json())
            .then(setHotel)
    }

    //gets hotel info without changing state
    const getHotelByEventId = (eventId) => {
        return fetch(`http://localhost:8088/hotels?eventId=${eventId}`)
            .then(res => res.json())
    }

    //adds new hotel to database
    const addHotel = hotel => {
        return fetch("http://localhost:8088/hotels", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(hotel)
        })
            .then(getHotelByEvent(hotel.eventId))
    }

    //deletes hotel from database
    const removeHotel = hotel => {
        return fetch(`http://localhost:8088/hotels/${hotel.id}`, {
            method: "DELETE"
        })
            .then(getHotelByEvent(hotel.eventId))
    }

    //updates hotel in database 
    const editHotel = hotel => {
        return fetch(`http://localhost:8088/hotels/${hotel.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(hotel)
        })
            .then(getHotelByEvent(hotel.eventId))
    }

    return (
        <HotelContext.Provider value={{
            hotel, getHotelByEvent, getHotelByEventId, addHotel, removeHotel, editHotel
        }}>
            {props.children}
        </HotelContext.Provider>
    )
}