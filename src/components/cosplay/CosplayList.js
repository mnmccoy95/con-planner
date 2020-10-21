import React, { useContext, useEffect, useRef } from "react"
import { CosplayContext } from "./CosplayProvider"
import { CosplayCard } from "./CosplayCard"
import { useHistory } from 'react-router-dom';
import "./Cosplay.css"
import { EventContext } from "../event/EventProvider"
import { ECContext } from "../eventCosplay/ECProvider"

export const CosplayList = () => {

    const { cosplays, getCosplays } = useContext(CosplayContext)
    const { events, getEvents } = useContext(EventContext)
    const { addEC, getAllECs } = useContext(ECContext)

    const event = useRef(null)
    const existDialog = useRef()
	
    useEffect(() => {
      getCosplays()
      getEvents()
    }, [])

    const history = useHistory()

    const ECSaver = () => {
      if(parseInt(event.current.value) !== 0) {
        const modal = document.querySelector("#myModal")
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
          }
        })
      }
    }

    return (
      <>
          <div id="myModal" className="modal">
            <div className="modal-content">
              <button id="close" className="delete" onClick={() => {
                document.querySelector("#myModal").style.display = "none"
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
          <div className="cosplays">
          <div className="cosplayHeader">
            <div className="cosplayTitle">Cosplays</div>
            <button className="addNewCosplay add" onClick={() => {history.push("/cosplays/create")}}>
                      +
                </button>
          </div>
          <div className="allCosplays">
            {
          cosplays.map(cosplay => {
            return <CosplayCard key={cosplay.id} cosplay={cosplay} />
          })
            }
            <div className="placeHolder"></div>
            <div className="placeHolder"></div>
          </div>
        </div>
      </>
    )
}