import React, {useContext, useRef} from "react"
import { Link, useHistory } from "react-router-dom"
import {EventContext} from "./EventProvider"

//defines html for each event
export const EventCard = ({ event }) => {

    const { deleteEvent } = useContext(EventContext)

    const history = useHistory()
    const existDialog = useRef()

    return (
    <section className="event">
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
        <div className="event__name">
            <Link to={`/events/detail/${event.id}`}>
                { event.name }
            </Link>
        </div>
        <div>
        <button className="deleteEvent delete" onClick={
                () => {
                    existDialog.current.showModal()
                }
            }>🗑️</button>
            
        </div>
        <div className="event__times">{new Date(event.startDate).toLocaleDateString('en-US')}
         - {new Date(event.endDate).toLocaleDateString('en-US')}
        </div>
    </section>)
}