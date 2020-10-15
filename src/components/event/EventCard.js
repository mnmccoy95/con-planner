import React from "react"
import { Link } from "react-router-dom"

//defines html for each event
export const EventCard = ({ event }) => {
    return (
    <section className="event">
        <h3 className="event__name">
            <Link to={`/events/detail/${event.id}`}>
                { event.name }
            </Link>
        </h3>
        <div className="event__times">{new Date(event.startDate).toLocaleDateString('en-US')}
         - {new Date(event.endDate).toLocaleDateString('en-US')}
        </div>
    </section>)
}