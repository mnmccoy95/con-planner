import React, { useContext, useEffect, useState, useRef } from "react"
import { ECContext } from "./ECProvider"
import { ECCard } from "./ECCard"
import { useParams } from 'react-router-dom';
import { CosplayContext } from "../cosplay/CosplayProvider"
import { EventContext } from "../event/EventProvider"
import { EEList } from "../eventEssential/EEList"
import "./EC.css"

export const ECList = () => {
    //defines info/functions to be used
    const { ECs, getECs, addEC, getAllECs } = useContext(ECContext)
    const { cosplays, getCosplays, getCosplayByIdWithItems } = useContext(CosplayContext)
    const { events, addEvent } = useContext(EventContext)
    //sets the state of the cosplay-event relationships
    const [cosplayEvents, setCosplayEvents] = useState([])
    //defiens the id of the specific event
    let {id} = useParams()
    //sets the url string that is used for a cosplay fetch call
    let url = ""

    //checks if current page is home or event
    //if on home page, sets event id to the closest occurring event
    const homeGrabber = () => {
        if(typeof(id) === "string"){
        } else {
            const futureEvents = events.filter(event =>{
                if(event.startDate <= Date.now() && event.endDate > Date.now()){
                    return event 
                } else if (event.startDate >= Date.now()){
                    return event
                }
            })
            if(futureEvents){
            id = futureEvents[0].id
            }
        }
    }
    
    //defines info to be used for creating new event-cosplay relationships
    const cosplay = useRef(null)
    const existDialog = useRef()

    //gets all event-cosplay relationships for specific event
    //gets all cosplayd for the current user
    //checks if current page is home
    //resets the url that is used in cosplay fetch call
    useEffect(() => {
        getECs(parseInt(id))
        getCosplays()
        homeGrabber()
    
        url = ""
    }, [addEvent])

    //creates an array of all cosplayIds that are associated with the event
    //creates a url to fetch those cosplays and their associated items
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

    //saves new event-cosplay relationship
    const ECSaver = () => {
        //verifies the relationship won't be saved if no cosplay is chosen
        if(parseInt(cosplay.current.value) !== 0) {
            const modal = document.querySelector("#myModal")
            //verifies that relationship does not already exist
            getAllECs()
            .then((response) => {
              const existing = response.find(relationship => {
                return relationship.eventId === parseInt(modal.value) && relationship.cosplayId === parseInt(cosplay.current.value)
              })
              //if the relationship exists, notify user and do not save
              if(existing) {
                existDialog.current.showModal()
              }
              //save event-cosplay relationship and reset dropdown value
              else {
                addEC({
                  eventId: parseInt(modal.value),
                  cosplayId: parseInt(cosplay.current.value)
                }).then(() => {modal.style.display = "none"})
                .then(getECs(id))
                .then(cosplay.current.value = "0")
              }
            })
        }
    }

    //defines html for event-cosplay list
    return (
        <>
        {homeGrabber()}
        <div id="myModal" className="modal">
            <div className="modal-content">
                <button id="close" className="delete" onClick={() => {
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
                <button className="createEC add" onClick={() => {
                    ECSaver()
                }}type="button" id="event-form-submit">Save to Event</button>
                <button id="close" className="delete" onClick={() => {
                    document.querySelector("#myModal").style.display = "none"
                }}>Close</button>
                <dialog className="logout--dialog" ref={existDialog}>
                <div>You're already bringing that!</div>
                <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
              </dialog>
            </div>
        </div>
        <div className="suitcase-container">
            <div className="suitcase-header">Cosplays
                <button  className="addEventCosplay add" onClick={() => {
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

