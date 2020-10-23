import React, {useContext, useRef, useEffect} from "react"
import {EventContext} from "./event/EventProvider"
import {ECList} from "./eventCosplay/ECList"
import {BudgetCard} from "./budget/BudgetCard"
import {CosplayContext} from "./cosplay/CosplayProvider"
import {CosplayCard} from "./cosplay/CosplayCard"
import {ECContext} from "./eventCosplay/ECProvider"

export const HomeCard = () => {
    const { events } = useContext(EventContext)
    const { cosplays } = useContext(CosplayContext)
    const { addEC, getAllECs } = useContext(ECContext)

    useEffect(() => {
        getAllECs()
    }, [])

    const event = useRef(null)
    const existDialog = useRef()
    const modalCos = document.querySelector("#myModalCos")

    window.onclick = function(event) {
      if (event.target == modalCos) {
          modalCos.style.display = "none";
      }
    }
    
    const ECSaver = () => {
      if(parseInt(event.current.value) !== 0) {
        const modal = document.querySelector("#myModalCos")
        getAllECs()
        .then((response) => {
          const existing = response.find(relationship => {
            return relationship.cosplayId === parseInt(modal.value) && relationship.eventId === parseInt(event.current.value)
          })
          if(existing) {
            existDialog.current.showModal()
          }
          else {
            addEC({
              cosplayId: parseInt(modal.value),
              eventId: parseInt(event.current.value)
            }).then(() => {modal.style.display = "none"})
            .then(getAllECs())
          }
        })
      }
    }

    const cosplayFinder = () => {
        if(cosplays.length !== 0){
          const futureCosplays = cosplays.filter(cosplay => {
            return cosplay.complete !== true
          })
          if(futureCosplays.length !== 0){
            return (<div className="homeCosplays">
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
              <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>You're already bringing that!</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
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
                </div>)
          } else {
            return (
              <div className="homeCosplays">
                <div className="homeProgressTitle">Unfinished Cosplays</div>
                <div className="allHomeCosplays">You have none!</div>
              </div>
            )
          }

        }
    }

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
                <BudgetCard />
                {cosplayFinder()}
                </div>
                <ECList/>
                </>
            )
        } else {
            return (
                <>
                <div className="noEventContainer">
                <h2 className="noEventHeader">No upcoming events :(</h2>
                {cosplayFinder()}
                </div>
                </>
            )
        }
    }    
    else {
        return (
            <>
            <div className="noEventContainer">
            <h2 className="noEventHeader">Welcome to Con Planner!</h2>
            <div className="addEventInfo">Your next event will be here when added!</div>
            {cosplayFinder()}
            </div>
            </>
        )
    }
}