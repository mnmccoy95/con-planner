import React, { useContext, useEffect, useState, useRef } from "react"
import { EventContext } from "./EventProvider"
import { useParams, useHistory } from "react-router-dom"
import { HotelCard } from "../hotel/HotelCard"
import { BudgetCard } from "../budget/BudgetCard"

export const EventDetail = () => {
    const { deleteEvent, getEventById } = useContext(EventContext)
	
	const [event, setEvent] = useState({})
	
	const {id} = useParams();
    const history = useHistory();
    const existDialog = useRef()

    useEffect(() => {
        getEventById(id)
        .then((response) => {
			setEvent(response)
		})
	}, [])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    const badgeStatus = () => {
        if(event.badgeStatus === true){
            return(
                <>Badge Purchased: ✔️<br></br>
                Badge Price: {formatter.format(event.badgePrice)}
                </>
            )
        } else {
            return (
                <>Badge Purchased: ❌<br></br>
                Badge Price: {formatter.format(event.badgePrice)}
                </>
            )
        }
    }

    return (
        <div className="eventDetailPageContainer margin">
            <dialog className="logout--dialog" ref={existDialog}>
            <div>Are you sure you want to delete?</div>
            <button className="logout--yes" onClick={() => {
                deleteEvent(event.id)
                .then(() => {
                    history.push("/events")
                })   
            }}>Delete</button>
            <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
        </dialog>
        <section className="eventDetail">
            <div className="event__name__detail">{event.name}
            <button className="deleteEvent__detail delete" onClick={
                () => {
                    existDialog.current.showModal()
                }
            }>🗑️</button>
            
            <button className="editEvent edit" onClick={() => {
                history.push(`/events/edit/${event.id}`)
            }}>✏️</button>
            </div>
            <div className="event__times__detail">{new Date(event.startDate).toLocaleDateString('en-US')}
                - {new Date(event.endDate).toLocaleDateString('en-US')}
            </div>
            <div className="event__location">{event.eventAddress}<br></br>{event.eventCity}, {event.eventState} {event.eventZip}</div>
            <div className="event__badge">{badgeStatus()}</div> 
        </section>
        <HotelCard />
        <BudgetCard />
        </div>
    )
}