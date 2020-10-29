import React, { useContext, useEffect, useRef } from "react"
import { EssentialContext } from "./EssProvider"
import { EssentialCard } from "./EssCard"
import { useHistory } from 'react-router-dom';
import {EventContext} from "../event/EventProvider"
import {EEContext} from "../eventEssential/EEProvider"
import "./Ess.css"


export const EssentialList = () => {
    //defines context to be used
    const { essentials, getEssentials } = useContext(EssentialContext)
	const { events, getEvents } = useContext(EventContext)
    const { addEE, getAllEEs } = useContext(EEContext)

    //references used for saving event-essential relationship
    const event = useRef(null)
    const existDialog = useRef()

    //rerenders page on context change
    useEffect(() => {
        getEssentials()
        getEvents()
    }, [])

    //used for navigating pages
    const history = useHistory()

    //defines relevant modal
    const modalEss = document.querySelector("#myModal")
    //closes modal when elsewhere on page is clicked
    window.onclick = function(event) {
        if (event.target == modalEss) {
            modalEss.style.display = "none";
        }
    }

    //saves event-essential relationship when called
    const EESaver = () => {
        //verifies that an event is chosen
        if(parseInt(event.current.value) !== 0) {
            //defines modal to get value
            const modal = document.querySelector("#myModal")
            //verifies that event-essential relationship does not exist
            getAllEEs()
            .then((response) => {
              const existing = response.find(relationship => {
                return relationship.essentialId === parseInt(modal.value) && relationship.eventId === parseInt(event.current.value)
              })
              //if relationship exists, notify the user and do not save
              if(existing) {
                existDialog.current.showModal()
              }
              //saves event-essential relationship and closes modal
              else {
                addEE({
                  essentialId: parseInt(modal.value),
                  eventId: parseInt(event.current.value)
                }).then(() => {modal.style.display = "none"})
              }
            })
        }
    }

    //defines html for essential list
    return (
        <div className="essentials margin">
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <button id="close" 
                    className="delete"
                    onClick={() => {
                        document.querySelector("#myModal").style.display = "none"
                    }}>&times;</button>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="eventEssential">Bring to: </label>
                            <select defaultValue="" name="eventEssential" ref={event} id="eventEssential" className="form-control">
                                <option value="0">Select an Event</option>
                                {events.map(l => (
                                    <option key={l.id} value={l.id}>
                                        {l.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </fieldset>
                    <button className="createEE add" onClick={() => {
                        EESaver()
                    }}type="button" id="event-form-submit">Save to Event</button>
                    <dialog className="logout--dialog" ref={existDialog}>
                    <div>You're already bringing that!</div>
                    <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
                    </dialog>
                </div>
            </div>
            <div className="essHeader">
                <div className="essTitle">Essentials</div>
                <button  className="addEss add" onClick={() => {history.push("/essentials/create")}}>
                        +
                </button>
            </div>
            <div className="allEss">
                {
                    essentials.map(essential => {
                        return <EssentialCard key={essential.id} essential={essential} />
                    })
                }
            </div>
        </div>
    )
}

