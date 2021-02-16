import React, { useContext, useEffect, useRef } from "react"
import { HotelContext } from "./HotelProvider"
import { useHistory, useParams } from 'react-router-dom';
import "./Hotel.css"

export const HotelCard = () => {
    //defines info and functions to be used
    const { hotel, getHotelByEvent, removeHotel } = useContext(HotelContext)
    //defines relevant eventId
    const {id} = useParams();
    //used for notifying user of deletion
    const existDialog = useRef()
    
    //gets relevant hotel info for event
    useEffect(() => {
        getHotelByEvent(parseInt(id))
    }, [])

    //used for navigating pages
    const history = useHistory()

    //checks if hotel for event already exists
    const getid = () => {
        //if hotel does not exist, show button for adding new one
        if(hotel.length === 0){
            return (
                <button className="addNewHotel add" onClick={() => {history.push(`/events/hotel/create/${id}`)}}>
                    +
                </button>
            )
        } else {
            //defines buttons for deleting/editing events
            return ( 
                <>
                <dialog className="logout--dialog" ref={existDialog}>
                <div>Are you sure you want to delete?</div>
                <button className="logout--yes" onClick={() => {
                    removeHotel(hotel[0])
                    .then(() => {
                        getHotelByEvent(parseInt(id))
                    })
                }}>Delete</button>
                <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
                </dialog>
                <button className="deleteHotel delete" onClick={
                    () => {
                        existDialog.current.showModal()
                    }
                }>🗑️</button>
                <button className="editHotel edit" onClick={() => { history.push(`/events/hotel/edit/${id}`) }}>✏️</button>
                </>
            )
        }
    }

    //defines html for hotel info if hotel exists
    const hotelInfo = () => {
        if(hotel.length === 1){
            return ( <section className="hotelDetail">
            <div className="hotel__name__detail">{hotel[0].name}
            </div>
            <div className="hotel__location">{hotel[0].address}<br></br>{hotel[0].city}, {hotel[0].state} {hotel[0].zip}</div>
            <div className="peopleNumber">People in Your Room: {hotel[0].people}</div>
            <div className="event__badge">{purchaseStatus()}</div>
        </section>)
        }
    }

    //used for formatting monetary values
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    //displays relevant html based on if hotel is purchased or not
    const purchaseStatus = () => {
        if(hotel[0].purchased === true){
            return(
                <>Room Purchased: ✔️<br></br>
                Room Price: {formatter.format(hotel[0].price)}
                </>
                )
        } else {
            return (
                <>Room Purchased: ❌<br></br>
                Room Price: {formatter.format(hotel[0].price)}
                </>
            )
        }
        
    }

    //returns base html for hotel info and calls functions for more
    return (
        <div className="hotel">
            <div className="hotelHeader">
            <div className="yourHotel">Your Hotel</div>
            {getid()}
            </div>
            {hotelInfo()}
            
        </div>
    )
}