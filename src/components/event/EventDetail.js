import React, { useContext, useEffect, useState } from "react"
import { EventContext } from "./EventProvider"
import { useParams, useHistory } from "react-router-dom"

export const EventDetail = () => {
    const { deleteEvent, getEventById } = useContext(EventContext)
	
	const [event, setEvent] = useState({})
	
	const {id} = useParams();
	const history = useHistory();

    useEffect(() => {
        getEventById(id)
        .then((response) => {
			setEvent(response)
		})
	}, [])

    const badgeStatus = () => {
        if(event.badgeStatus === true){
            return(
                <>Badge: Purchased<br></br>
                Badge Price: ${event.badgePrice}
                </>
            )
        } else {
            return (
                <>Badge: Not Yet Purchased<br></br>
                Badge Price: ${event.badgePrice}
                </>
            )
        }
    }

    return (
        <section className="eventDetail">
            <h3 className="event__name">{event.name}</h3>
            <div className="event__times">{new Date(event.startDate).toLocaleDateString('en-US')}
                - {new Date(event.endDate).toLocaleDateString('en-US')}
            </div>
            <div className="event__location">{event.eventAddress}<br></br>{event.eventCity}, {event.eventState} {event.eventZip}</div>
            <div className="event__badge">{badgeStatus()}</div>

            <button onClick={
                () => {
                    deleteEvent(event.id)
                        .then(() => {
                            history.push("/events")
                        })
                }
            }>Delete Event</button>
            
            <button onClick={() => {
                history.push(`/events/edit/${event.id}`)
            }}>Edit</button>
        </section>
    )
}