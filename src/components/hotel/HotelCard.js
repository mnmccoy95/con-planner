import React, { useContext, useEffect, useRef } from "react"
import { HotelContext } from "./HotelProvider"
import { useHistory, useParams } from 'react-router-dom';
import "./Hotel.css"

export const HotelCard = () => {

    const { hotel, getHotelByEvent, removeHotel } = useContext(HotelContext)
    const {id} = useParams();
    const existDialog = useRef()
	
    useEffect(() => {
        getHotelByEvent(parseInt(id))
    }, [])

    const history = useHistory()
    const getid = () => {
        if(hotel.length === 0){
            return (
                <button className="addNewHotel add" onClick={() => {history.push(`/events/hotel/create/${id}`)}}>
                    +
                </button>
            )
        } else {
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

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

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