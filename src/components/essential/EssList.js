import React, { useContext, useEffect, useRef } from "react"
import { EssentialContext } from "./EssProvider"
import { EssentialCard } from "./EssCard"
import { useHistory } from 'react-router-dom';
import {EventContext} from "../event/EventProvider"
import {EEContext} from "../eventEssential/EEProvider"
import "./Ess.css"


export const EssentialList = () => {
    const { essentials, getEssentials } = useContext(EssentialContext)
	const { events, getEvents } = useContext(EventContext)
    const { addEE, getAllEEs } = useContext(EEContext)

    const event = useRef(null)
    const existDialog = useRef()

    useEffect(() => {
        getEssentials()
        getEvents()
    }, [])

    const history = useHistory()

    const modalEss = document.querySelector("#myModal")
    window.onclick = function(event) {
        if (event.target == modalEss) {
            modalEss.style.display = "none";
        }
    }

    const EESaver = () => {
        if(parseInt(event.current.value) !== 0) {
            const modal = document.querySelector("#myModal")
            getAllEEs()
            .then((response) => {
              const existing = response.find(relationship => {
                return relationship.essentialId === parseInt(modal.value) && relationship.eventId === parseInt(event.current.value)
              })
              if(existing) {
                existDialog.current.showModal()
              }
              else {
                addEE({
                  essentialId: parseInt(modal.value),
                  eventId: parseInt(event.current.value)
                }).then(() => {modal.style.display = "none"})
              }
            })
        }
    }

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
                        <select defaultValue="" name="eventEssential" ref={event} id="eventEssential" className="form-control" >
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

