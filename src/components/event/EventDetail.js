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
            <div className="event__name__detail">{event.name}
            <button className="deleteEvent" onClick={
                () => {
                    deleteEvent(event.id)
                        .then(() => {
                            history.push("/events")
                        })
                }
            }>🗑️</button>
            
            <button onClick={() => {
                history.push(`/events/edit/${event.id}`)
            }}>✏️</button>
            </div>
            <div className="event__times__detail">{new Date(event.startDate).toLocaleDateString('en-US')}
                - {new Date(event.endDate).toLocaleDateString('en-US')}
            </div>
            <div className="event__location">{event.eventAddress}<br></br>{event.eventCity}, {event.eventState} {event.eventZip}</div>
            <div className="event__badge">{badgeStatus()}</div>

            
        </section>
    )
}