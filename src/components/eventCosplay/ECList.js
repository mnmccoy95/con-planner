import React, { useContext, useEffect, useState, useRef } from "react"
import { ECContext } from "./ECProvider"
import { ECCard } from "./ECCard"
import { useParams } from 'react-router-dom';
import { CosplayContext } from "../cosplay/CosplayProvider"
import { EventContext } from "../event/EventProvider"
import { EEList } from "../eventEssential/EEList"
import "./EC.css"

export const ECList = () => {
    const { ECs, getECs, addEC, getAllECs } = useContext(ECContext)
    const { cosplays, getCosplays, getCosplayByIdWithItems } = useContext(CosplayContext)
    const { events, addEvent } = useContext(EventContext)
    const [cosplayEvents, setCosplayEvents] = useState([])
    let {id} = useParams()
    let url = ""

    const homeGrabber = () => {
        if(typeof(id) === "string"){
        } else {
            const futureEvents = events.filter(event =>{
                if(event.startDate >= Date.now()){
                    return event }
            })
            if(futureEvents){
            id = futureEvents[0].id
            }
        }
    }
    
    const cosplay = useRef(null)
    const existDialog = useRef()

    useEffect(() => {
        getECs(parseInt(id))
        getCosplays()
        homeGrabber()
    
        url = ""
    }, [addEvent])

    useEffect(() => {
        url = ""
        const cosplayIds = ECs.map((EC) => {
            return EC.cosplayId
        })
        url = cosplayIds.map((cosplay) => {
            return `id=${cosplay}`
        }).join("&")

        if(url !== ""){
        getCosplayByIdWithItems(url)
        .then((response) => {
                setCosplayEvents(response)
        })} else {
            setCosplayEvents([])
        }
        
    }, [getECs, ECs])

    const ECSaver = () => {
        if(parseInt(cosplay.current.value) !== 0) {
            const modal = document.querySelector("#myModal")
            getAllECs()
            .then((response) => {
              const existing = response.find(relationship => {
                return relationship.eventId === parseInt(modal.value) && relationship.cosplayId === parseInt(cosplay.current.value)
              })
              if(existing) {
                existDialog.current.showModal()
              }
              else {
                addEC({
                  eventId: parseInt(modal.value),
                  cosplayId: parseInt(cosplay.current.value)
                }).then(() => {modal.style.display = "none"})
                .then(getECs(id))
              }
            })
        }
    }

    return (
        <>
        {homeGrabber()}
        <div id="myModal" className="modal">
            <div className="modal-content">
                <button id="close" onClick={() => {
                    document.querySelector("#myModal").style.display = "none"
                }}>&times;</button>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="eventCosplay">Bringing: </label>
                        <select defaultValue="" name="eventCosplay" ref={cosplay} id="eventCosplay" className="form-control" >
                            <option value="0">Select a Cosplay</option>
                            {cosplays.map(l => (
                                <option key={l.id} value={l.id}>
                                    {l.character}
                                </option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <button onClick={() => {
                    ECSaver()
                }}type="button" id="event-form-submit">Save to Event</button>
                <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>You're already bringing that!</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
              </dialog>
            </div>
        </div>
        <div className="suitcase-container">
            <div className="suitcase-header">Cosplays
                <button  className="addEventCosplay" onClick={() => {
                    const modal = document.querySelector("#myModal")
                    modal.style.display = "block"
                    modal.value = parseInt(id)
                }}>+</button>
            </div>
            <div className="allEventCosplays">
                {cosplayEvents.map(cosplay => {
                    return <ECCard key={cosplay.id} cosplay={cosplay} />
                })}
            </div>
            <EEList />
        </div>
        </>
    )
}

