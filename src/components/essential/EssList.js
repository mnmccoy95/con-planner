import React, { useContext, useEffect, useRef } from "react"
import { EssentialContext } from "./EssProvider"
import { EssentialCard } from "./EssCard"
import { useHistory } from 'react-router-dom';
import {EventContext} from "../event/EventProvider"
import {EEContext} from "../eventEssential/EEProvider"


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
                        <label htmlFor="eventEssential">Choose Event: </label>
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
                }}type="button" id="event-form-submit">Save Event</button>
                </div>
            </div>
            <h2>Your Saved Essentials</h2>
            <button onClick={() => {history.push("/essentials/create")}}>
                    Add New Essential
            </button>
            {
            essentials.map(essential => {
                return <EssentialCard key={essential.id} essential={essential} />
            })
            }
        </div>
    )
}

