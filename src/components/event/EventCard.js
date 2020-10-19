import React, {useContext} from "react"
import { Link, useHistory } from "react-router-dom"
import {EventContext} from "./EventProvider"

//defines html for each event
export const EventCard = ({ event }) => {

    const { deleteEvent } = useContext(EventContext)

    const history = useHistory()

    return (
    <section className="event">
        <div className="event__name">
            <Link to={`/events/detail/${event.id}`}>
                { event.name }
            </Link>
        </div>
        <div>
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
        <div className="event__times">{new Date(event.startDate).toLocaleDateString('en-US')}
         - {new Date(event.endDate).toLocaleDateString('en-US')}
        </div>
    </section>)
}