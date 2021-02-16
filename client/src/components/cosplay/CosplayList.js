import React, { useContext, useEffect, useRef } from "react"
import { CosplayContext } from "./CosplayProvider"
import { CosplayCard } from "./CosplayCard"
import { useHistory } from 'react-router-dom';
import "./Cosplay.css"
import { EventContext } from "../event/EventProvider"
import { ECContext } from "../eventCosplay/ECProvider"

export const CosplayList = () => {
  //defines functions to be used
  const { cosplays, getCosplays } = useContext(CosplayContext)
  const { events, getEvents } = useContext(EventContext)
  const { addEC, getAllECs } = useContext(ECContext)

  //defines relevant info for saving new event-cosplay relationships
  const event = useRef(null)
  const existDialog = useRef()
  
  //gets relevant info on context change
  useEffect(() => {
    getCosplays()
    getEvents()
  }, [])

  //for navigating pages
  const history = useHistory()

  //defines modal for closing on page click
  const modalCos = document.querySelector("#myModalCos")

  //closes modal if page is clicked
  window.onclick = function(event) {
    if (event.target == modalCos) {
        modalCos.style.display = "none";
    }
  }
  
  //saves event-cosplay relationship when called
  const ECSaver = () => {
    //verifies that an event is chosen
    if(parseInt(event.current.value) !== 0) {
      //defines modal to save value
      const modal = document.querySelector("#myModalCos")
      //verifies that relationship doesn't already exist
      getAllECs()
      .then((response) => {
        const existing = response.find(relationship => {
          return relationship.cosplayId === parseInt(modal.value) && relationship.eventId === parseInt(event.current.value)
        })
        //if relationship exists, notifies user and does not save
        //otherwise, saves relationship and closes modal
        if(existing) {
          existDialog.current.showModal()
        } else {
          addEC({
            cosplayId: parseInt(modal.value),
            eventId: parseInt(event.current.value)
          }).then(() => {modal.style.display = "none"})
        }
      })
    }
  }

  //defines relevant info for cosplay list
  return (
    <>
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
          <dialog className="logout--dialog" ref={existDialog}>
            <div>You're already bringing that!</div>
            <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
          </dialog>
        </div>
      </div>
      <div className="cosplays margin">
        <div className="cosplayHeader">
          <div className="cosplayTitle">Cosplays</div>
          <button className="addNewCosplay add" onClick={() => {history.push("/cosplays/create")}}>
            +
          </button>
        </div>
        <div className="allCosplays">
          <div className="inProgress">
            <div className="progressTitle">In Progress</div>
            <div className="allInProgress">
              {
                cosplays.map(cosplay => {
                  if(cosplay.complete !== true){
                    return <CosplayCard key={cosplay.id} cosplay={cosplay} />
                  }
                })
              }
            </div>
          </div>
          <div className="completeCosplays">
            <div className="progressTitle">Finished</div>
            <div className="allComplete">
              {
                cosplays.map(cosplay => {
                  if(cosplay.complete === true){
                    return <CosplayCard key={cosplay.id} cosplay={cosplay} />
                  }
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}