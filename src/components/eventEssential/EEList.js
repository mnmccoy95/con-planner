import React, { useContext, useEffect, useRef } from "react"
import { EEContext } from "./EEProvider"
import { EECard } from "./EECard"
import { useParams } from 'react-router-dom';
import { EssentialContext } from "../essential/EssProvider"
import { EventContext } from "../event/EventProvider"
// import "./EE.css"

export const EEList = () => {
  //defines info and funcions to be used
  const { EEs, getEEs, addEE, getAllEEs } = useContext(EEContext)
  const { essentials, getEssentials } = useContext(EssentialContext)
  const { events, getEvents } = useContext(EventContext)
  
  //defines relevant event
  let {id} = useParams();

  //used for saving new event-essential relationship
  const essential = useRef(null)
  const existDialog = useRef()

  //verifies that current page is not home screen.
  //if it is, sets relevant event id to closest occurring event
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

  //gets all event-essential relationships for this event
  //gets all essentials
  //checks if current page is home screen
  useEffect(() => {
    getEEs(id)
    getEssentials()
    homeGrabber()
  }, [getEvents])

  //defines all modals and dialog boxes
  const modalEss = document.querySelector("#myModalEssential")
  const modalCos = document.querySelector("#myModal")
  const modalCos2 = document.querySelector("#myModalCos")
  const dialogBox = document.querySelector(".logout-dialog")

  //if the window is clicked outside of a modal or dialog, close the modal/dialog
  window.onclick = function(event) {
    if (event.target == modalEss) {
      modalEss.style.display = "none";
    } else if (event.target == modalCos) {
      modalCos.style.display = "none";
    } else if (event.target == modalCos2) {
       modalCos2.style.display = "none";
    } else if (event.target == dialogBox){
      console.log("hewwo")
      dialogBox.style.display ="none"
    }
  }

  //saves new event-essential relationship
  const EESaver = () => {
    //verfies that essential is chosen
    if(parseInt(essential.current.value) !== 0) {
      //defines modal so value can be used and saved
      const modal = document.querySelector("#myModalEssential")
      modal.value = parseInt(id)
      //gets all event-essential relationships
      //if currently selected relationship exists, does not save
      getAllEEs()
      .then((response) => {
        const existing = response.find(relationship => {
          return relationship.eventId === parseInt(modal.value) && relationship.essentialId === parseInt(essential.current.value)
        })
        //notifies user that relationship exists
        if(existing) {
          existDialog.current.showModal()
        }
        //saves relationship and resets dropdown value
        else {
          addEE({
            eventId: parseInt(modal.value),
            essentialId: parseInt(essential.current.value)
          }).then(() => {modal.style.display = "none"})
          .then(getEEs(id))
          .then(essential.current.value = "0")
        }
      })
    }
  }
    
  //defines html for event-essential list
  return (
    <>
    {homeGrabber()}
    <div id="myModalEssential" className="modal">
        <div className="modal-content">
          <button id="close" className="delete" onClick={() => {
            document.querySelector("#myModalEssential").style.display = "none"
          }}>&times;</button>
          <fieldset>
            <div className="form-group">
                <label htmlFor="eventEssential">Bringing: </label>
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
          <button className="createEE add" onClick={() => {
            EESaver()
          }}type="button" id="event-form-submit">Save to Event</button>
          <button id="close" className="delete" onClick={() => {
            document.querySelector("#myModalEssential").style.display = "none"
          }}>Close</button>
          <dialog className="logout--dialog" ref={existDialog}>
            <div>You're already bringing that!</div>
            <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
          </dialog>
        </div>
      </div>
      <div className="event-essential-all">
        <div className="suitcase-header">Essentials
          <button className="addEssentialEvent add" onClick={() => {
              const modal = document.querySelector("#myModalEssential")
              modal.style.display = "block"
              modal.value = parseInt(id)
            }}>+</button>
        </div>
        <div className="event-essential-list">
          {EEs.map(EE => {
              return <EECard key={EE.id} EE={EE} />
          })}
        </div>
      </div>
    </>
  )
}

