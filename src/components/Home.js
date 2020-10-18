import React, {useContext, useEffect} from "react"
import {EventContext} from "./event/EventProvider"
import {EventCard} from "./event/EventCard"


export const Home = () => {
    // This state changes when `getEvents()` is invoked below
    const { events, getEvents } = useContext(EventContext)

	//useEffect - reach out to the world for something
    useEffect(() => {
      getEvents()
    }, [])

    const nearestEvent = () => {
        if(events.length !== 0){
            const futureEvents = events.filter(event =>{
                if(event.startDate >= Date.now()){
                    return event }
            })

            const badgeStatus = () => {
                if(futureEvents[0].badgeStatus === true){
                    return(
                        <>Badge: Purchased<br></br>
                        Badge Price: ${futureEvents[0].badgePrice}
                        </>
                    )
                } else {
                    return (
                        <>Badge: Not Yet Purchased<br></br>
                        Badge Price: ${futureEvents[0].badgePrice}
                        </>
                    )
                }
            }

            return (
                <>
                <div className="homeEvent">
                <h2>Your Next Event</h2>
                <section className="eventDetail">
                    <div className="event__name__detail">{futureEvents[0].name}</div>
                    <div className="event__times__detail">{new Date(futureEvents[0].startDate).toLocaleDateString('en-US')}
                        - {new Date(futureEvents[0].endDate).toLocaleDateString('en-US')}
                    </div>
                    <div className="event__location">{futureEvents[0].eventAddress}<br></br>{futureEvents[0].eventCity}, {futureEvents[0].eventState} {futureEvents[0].eventZip}</div>
                    <div className="event__badge">{badgeStatus()}</div>
                    
                </section>
                </div>
                </>
            )
        }
    }

    return(
    <>
        {nearestEvent()}
    </>
    )
}