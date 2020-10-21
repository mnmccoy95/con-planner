import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { EventCard } from "./EventCard"
import { useHistory } from 'react-router-dom';
import "./Event.css"

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
            <div className="event-head">
              <div className="eventTitle">Events</div>
              <button  className="add-event add" onClick={() => {history.push("/events/create")}}>
                        +
              </button>
            </div>
            <div className="allEvents">
              <div className="events__future">
                <div className="event-list-head">Upcoming Events</div>
                  {
                events.map(event => {
                  if(event.startDate >= Date.now()){
                    return <EventCard key={event.id} event={event} />}
                })}
              </div>
              <div className="events__past">
                <div className="event-list-head">Past Events</div>
                  {
                events.map(event => {
                  if(event.startDate < Date.now()){
                    return <EventCard key={event.id} event={event} />}
                })
                  }
              </div>
            </div>
          </div>
        </div>
    )
}