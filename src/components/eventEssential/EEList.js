import React, { useContext, useEffect, useState, useRef } from "react"
import { EEContext } from "./EEProvider"
import { EECard } from "./EECard"
import { useParams } from 'react-router-dom';
import { EssentialContext } from "../essential/EssProvider"
import { EventContext } from "../event/EventProvider"

export const EEList = () => {
    const { EEs, getEEs, addEE, removeEE } = useContext(EEContext)
    const { essentials, getEssentials } = useContext(EssentialContext)
    const { events, getEvents, addEvent } = useContext(EventContext)
    
    const {id} = useParams();

    const essential = useRef(null)

    useEffect(() => {
        getEEs(id)
        getEssentials()
    }, [])

    const EESaver = () => {
        const modal = document.querySelector("#myModalEssential")
        modal.style.display = "block"
        modal.value = parseInt(id)
        
        addEE({
          essentialId: parseInt(essential.current.value),
          eventId: parseInt(modal.value)
        })
        .then(() => {modal.style.display = "none"})
        .then(getEEs(parseInt(id)))
    }
    

    return (
        <>
        <div className="suitcase-container"><div id="myModalEssential" className="modal">
            <div className="modal-content">
              <button id="close" onClick={() => {
                document.querySelector("#myModalEssential").style.display = "none"
              }}>&times;</button>
              <fieldset>
                <div className="form-group">
                    <label htmlFor="eventEssential">Choose Essential: </label>
                    <select defaultValue="" name="eventEssential" ref={essential} id="eventEssential" className="form-control" >
                        <option value="0">Select a Essential</option>
                        {essentials.map(l => (
                            <option key={l.id} value={l.id}>
                                {l.name}
                            </option>
                        ))}
                    </select>
                </div>
              </fieldset>
              <button onClick={() => {
                EESaver()
              }}type="button" id="event-form-submit">Save Essential</button>
            </div>
          </div>
            <div className="suitcase-header">Essentials
            <button onClick={() => {
                const modal = document.querySelector("#myModalEssential")
                modal.style.display = "block"
                modal.value = parseInt(id)
              }}>+</button>
            </div>
            {EEs.map(EE => {
                return <EECard key={EE.id} EE={EE} />
            })}
        </div>
        </>
    )
}

