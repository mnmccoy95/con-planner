import React, { useContext, useEffect, useState, useRef } from "react"
import { ECContext } from "./ECProvider"
import { ECCard } from "./ECCard"
import { useParams } from 'react-router-dom';
import { CosplayContext } from "../cosplay/CosplayProvider"
import { EventContext } from "../event/EventProvider"

export const ECList = () => {
    const { ECs, getECs, addEC } = useContext(ECContext)
    const { cosplays, getCosplays, getCosplayByIdWithItems } = useContext(CosplayContext)
    const { events, getEvents, addEvent } = useContext(EventContext)
    const [cosplayEvents, setCosplayEvents] = useState([])
    const {id} = useParams();
    let url = ""

    const cosplay = useRef(null)

    useEffect(() => {
        getECs(parseInt(id))
        getCosplays()
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
        const modal = document.querySelector("#myModal")
        modal.style.display = "block"
        modal.value = parseInt(id)
        
        addEC({
          cosplayId: parseInt(cosplay.current.value),
          eventId: parseInt(modal.value)
        })
        .then(() => {modal.style.display = "none"})
        .then(getECs(parseInt(id)))
    }

    return (
        <>
        <div className="suitcase-container"><div id="myModal" className="modal">
            <div className="modal-content">
              <button id="close" onClick={() => {
                document.querySelector("#myModal").style.display = "none"
              }}>&times;</button>
              <fieldset>
                <div className="form-group">
                    <label htmlFor="eventCosplay">Choose Cosplay: </label>
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
              }}type="button" id="event-form-submit">Save Event</button>
            </div>
          </div>
            <div className="suitcase-header">Suitcase
            <button onClick={() => {
                const modal = document.querySelector("#myModal")
                modal.style.display = "block"
                modal.value = parseInt(id)
              }}>+</button>
            </div>
            {cosplayEvents.map(cosplay => {
                return <ECCard key={cosplay.id} cosplay={cosplay} />
            })}
        </div>
        </>
    )
}

