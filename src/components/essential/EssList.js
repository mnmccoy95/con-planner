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
    const { EEs, addEE } = useContext(EEContext)

    const event = useRef(null)

    useEffect(() => {
        getEssentials()
        getEvents()
    }, [])

    const history = useHistory()

    const EESaver = () => {
        const modal = document.querySelector("#myModal")
        addEE({
          essentialId: parseInt(modal.value),
          eventId: parseInt(event.current.value)
        })
        .then(() => {modal.style.display = "none"})
    }

    return (
        <div className="essentials">
            <div id="myModal" className="modal">
                <div className="modal-content">
                <button id="close" onClick={() => {
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
                <button onClick={() => {
                    EESaver()
                }}type="button" id="event-form-submit">Save to Event</button>
                </div>
            </div>
            <div className="essHeader">
            <div className="essTitle">Essentials</div>
            <button  className="addEss" onClick={() => {history.push("/essentials/create")}}>
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

