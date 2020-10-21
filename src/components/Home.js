import React, {useContext, useEffect} from "react"
import {EventContext} from "./event/EventProvider"
import {ECList} from "./eventCosplay/ECList"
import {BudgetCard} from "./budget/BudgetCard"
import "./Home.css"


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
                        <>Badge Purchased: ✔️<br></br>
                        Badge Price: ${futureEvents[0].badgePrice}
                        </>
                    )
                } else {
                    return (
                        <>Badge Purchased: ❌<br></br>
                        Badge Price: ${futureEvents[0].badgePrice}
                        </>
                    )
                }
            }

            if(futureEvents.length !== 0){
            return (
                <>
                <div className="homeEvent">
                <section className="eventDetail">
                    <div className="event__name__detail">{futureEvents[0].name}</div>
                    <div className="event__times__detail">{new Date(futureEvents[0].startDate).toLocaleDateString('en-US')}
                        - {new Date(futureEvents[0].endDate).toLocaleDateString('en-US')}
                    </div>
                    <div className="event__location">{futureEvents[0].eventAddress}<br></br>{futureEvents[0].eventCity}, {futureEvents[0].eventState} {futureEvents[0].eventZip}</div>
                    <div className="event__badge">{badgeStatus()}</div>
                </section>
                <div className="hidden">{futureEvents[0].id}</div>
                </div>
                <ECList/>
                <BudgetCard />
                </>
            )} else {
                return (
                    <>
                    <h2>No upcoming events :(</h2>
                    </>
                )
            }
            
        } else {
            return (
                <>
                <h2>Welcome to Con Planner!</h2>
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