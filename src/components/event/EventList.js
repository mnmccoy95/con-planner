import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { EventCard } from "./EventCard"
import { useHistory } from 'react-router-dom';

export const EventList = () => {
   // This state changes when `getEvents()` is invoked below
    const { events, getEvents } = useContext(EventContext)

	//useEffect - reach out to the world for something
    useEffect(() => {
      getEvents()
    }, [])

    const history = useHistory()

    //returns list of events, with future ones displayed in a higher container
    //past events are listed oldest to newest
    //future events are listed soonest to latest
    return (

        <div className="eventsContainer">
          <div className="events">
            <h2>Events</h2>
            <button onClick={() => {history.push("/events/create")}}>
                      Add New Event
            </button>
            <h3>Upcoming Events</h3>
            <div className="events__future">
              {
            events.map(event => {
              if(event.startDate >= Date.now()){
                return <EventCard key={event.id} event={event} />}
            })
              }</div>
            <h3>Past Events</h3>
            <div className="events__past">
              {
            events.map(event => {
              if(event.startDate < Date.now()){
                return <EventCard key={event.id} event={event} />}
            })
              }</div>
          </div>
        </div>
    )
}