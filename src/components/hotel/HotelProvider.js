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
    const [hotel, setHotel] = useState({})

    const getHotelByEvent = (eventId) => {
        return fetch(`http://localhost:8088/hotels?eventId=${eventId}`)
            .then(res => res.json())
            .then(setHotel)
    }

    const getHotelByEventId = (eventId) => {
        return fetch(`http://localhost:8088/hotels?eventId=${eventId}`)
            .then(res => res.json())
    }

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

    const removeHotel = hotel => {
        return fetch(`http://localhost:8088/hotels/${hotel.id}`, {
            method: "DELETE"
        })
            .then(getHotelByEvent(hotel.eventId))
    }

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