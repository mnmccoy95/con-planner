import React, { useContext, useEffect, useRef } from "react"
import { EEContext } from "./EEProvider"
import { EECard } from "./EECard"
import { useParams } from 'react-router-dom';
import { EssentialContext } from "../essential/EssProvider"
import { EventContext } from "../event/EventProvider"
// import "./EE.css"

export const EEList = () => {
    const { EEs, getEEs, addEE, getAllEEs } = useContext(EEContext)
    const { essentials, getEssentials } = useContext(EssentialContext)
    const { events, getEvents } = useContext(EventContext)
    
    let {id} = useParams();

    const essential = useRef(null)
    const existDialog = useRef()

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

    useEffect(() => {
        getEEs(id)
        getEssentials()
        homeGrabber()
    }, [getEvents])

    const modalEss = document.querySelector("#myModalEssential")
    const modalCos = document.querySelector("#myModal")
    const modalCos2 = document.querySelector("#myModalCos")
    const dialogBox = document.querySelector(".logout-dialog")

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

    const EESaver = () => {
      if(parseInt(essential.current.value) !== 0) {
        const modal = document.querySelector("#myModalEssential")
        modal.style.display = "block"
        modal.value = parseInt(id)
        getAllEEs()
        .then((response) => {
          const existing = response.find(relationship => {
            return relationship.eventId === parseInt(modal.value) && relationship.essentialId === parseInt(essential.current.value)
          })
          if(existing) {
            existDialog.current.showModal()
          }
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

