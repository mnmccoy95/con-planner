import React, {useContext, useRef, useEffect} from "react"
import {EventContext} from "./event/EventProvider"
import {ECList} from "./eventCosplay/ECList"
import {CosplayContext} from "./cosplay/CosplayProvider"
import {CosplayCard} from "./cosplay/CosplayCard"
import {ECContext} from "./eventCosplay/ECProvider"

export const HomeCard = () => {
  //defines info to be used
  const { events } = useContext(EventContext)
  const { cosplays } = useContext(CosplayContext)
  //defines functions to be used
  const { addEC, getAllECs } = useContext(ECContext)

  //gets all of the event cosplay relationships on render and when events change
  useEffect(() => {
    getAllECs()
  }, [events])

  //used for adding more event-cosplay relationships
  const event = useRef(null)
  const existDialog = useRef()

  //closes modal when elsewhere on screen is clicked
  const modalCos = document.querySelector("#myModalCos")
  window.onclick = function(event) {
    if (event.target == modalCos) {
        modalCos.style.display = "none";
    }
  }
  
  //saves event-cosplay relationship
  const ECSaver = () => {
    //verifies that an event is chosen
    if(parseInt(event.current.value) !== 0) {
      //defines modal so value can be saved
      const modal = document.querySelector("#myModalCos")
      //gets all event-cosplays to verify the relationship doesn't already exist
      getAllECs()
      .then((response) => {
        //checks for matching relationship object
        const existing = response.find(relationship => {
          return relationship.cosplayId === parseInt(modal.value) && relationship.eventId === parseInt(event.current.value)
        })
        //if the relationship already exists, notify user and do not save
        if(existing) {
          existDialog.current.showModal()
        } else {
          //saves new event-cosplay relationship
          addEC({
            cosplayId: parseInt(modal.value),
            eventId: parseInt(event.current.value)
          }).then(() => {modal.style.display = "none"})
          .then(getAllECs())
        }
      })
    }
  }

  //checks if cosplays exist and if there are any unfinished ones
  //if incomplete exist, return cards
  //if cosplays but none incomplete, tell user
  const cosplayFinder = () => {
    //checks that cosplays exist
    if(cosplays.length !== 0){
      const futureCosplays = cosplays.filter(cosplay => {
        return cosplay.complete !== true
      })
      //if incomplete cosplays exist, return html for each card
      if(futureCosplays.length !== 0){
        return (
          <div className="homeCosplays">
            <div id="myModalCos" className="modal">
              <div className="modal-content">
                <button id="close" className="delete" onClick={() => {
                  document.querySelector("#myModalCos").style.display = "none"
                }}>&times;</button>
                <fieldset>
                  <div className="form-group">
                    <label htmlFor="eventCosplay"> Bring to: </label>
                    <select defaultValue="" name="eventCosplay" ref={event} id="eventCosplay" className="form-control" >
                      <option value="0">Select an Event</option>
                      {events.map(l => (
                        <option key={l.id} value={l.id}>
                          {l.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </fieldset>
                <button className="addEC add" onClick={() => {
                  ECSaver()
                }}type="button" id="event-form-submit">Save to Event</button>
                <dialog className="logout--dialog" ref={existDialog}>
                  <div>You're already bringing that!</div>
                  <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
                </dialog>
              </div>
            </div>
            <div className="homeProgressTitle">Unfinished Cosplays</div>
            <div className="allHomeCosplays">
              {
                cosplays.map(cosplay => {
                  if(cosplay.complete !== true){
                    return <CosplayCard key={cosplay.id} cosplay={cosplay} />
                  }
                })
              }
            </div>
          </div>
        )
      } else {
        //if incomplete cosplays do not exist, return this
        return (
          <div className="homeCosplays">
            <div className="homeProgressTitle">Unfinished Cosplays</div>
            <div className="allHomeCosplays">You have none!</div>
          </div>
        )
      }
    }
  }

  //returns upcoming event info on homepage, based on the user's saved events
  if(events.length !== 0){
    //filters events to just those in the future and present
    const futureEvents = events.filter(event =>{
      if(event.startDate <= Date.now() && event.endDate > Date.now()){
        return event 
      } else if (event.startDate >= Date.now()){
        return event
      }
    })

    //returns html for event's badge status
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
    //if future/present events exist,
    //return this html for the closest occurring one
    if(futureEvents.length !== 0){
      return (
        <>
        <div className="homeContainer">
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
          {cosplayFinder()}
        </div>
        <ECList/>
        </>
      )
    } else {
      //if events exist but none in future/present,
      //return this html
      return (
        <>
        <div className="noEventContainer margin">
          <h2 className="noEventHeader">No upcoming events :(</h2>
          {cosplayFinder()}
        </div>
        </>
      )
    }
  } else {
    //if no events have been saved by user, return this
    return (
      <>
      <div className="noEventContainer margin">
        <h2 className="noEventHeader">Welcome to Con Planner!</h2>
        <div className="addEventInfo">Your next event will be here when added!</div>
        {cosplayFinder()}
      </div>
      </>
    )
  }
}