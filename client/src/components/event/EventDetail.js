import React, { useContext, useEffect, useState, useRef } from "react"
import { EventContext } from "./EventProvider"
import { useParams, useHistory } from "react-router-dom"
import { HotelCard } from "../hotel/HotelCard"
import { BudgetCard } from "../budget/BudgetCard"

export const EventDetail = () => {
    //defines functions to be used
    const { deleteEvent, getEventById } = useContext(EventContext)
	//sets event state
	const [event, setEvent] = useState({})
	//defines event id if in url
    const {id} = useParams()
    //used for navigating pages
    const history = useHistory()
    //references dialog box to notify user
    const existDialog = useRef()

    //rerenders page on state/context change
    useEffect(() => {
        getEventById(id)
        .then((response) => {
			setEvent(response)
		})
	}, [])

    //used for formatting monetary values
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    //displays relevant html for badge status
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

    //defines html for event detail
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