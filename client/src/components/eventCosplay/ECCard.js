import React, {useContext, useRef} from "react"
import { ECContext } from "./ECProvider"
import { useParams } from 'react-router-dom';

export const ECCard = ({ cosplay }) => {
    //defines function to be used
    const { removeEC } = useContext(ECContext)
    //defines event id
    let {id} = useParams()
    //used for verifying delete
    const existDialog = useRef()

    //checks if currently on the home page
    //if so, gets the relevant event id from a hidden container
    const homeGrabber = () => {
        if(typeof(id) === "string"){
        } else {
            id = document.querySelector(".hidden").innerHTML
        }
    }

    //defines html for each cosplay in the specific event
    return (
        <>
        {homeGrabber()}
        <section className="cosplayEvent">
        <dialog className="logout--dialog" ref={existDialog}>
            <div>Are you sure you want to delete?</div>
            <button className="logout--yes" onClick={() => {
                removeEC(cosplay.id, parseInt(id))
            }}>Delete</button>
            <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
        </dialog>
            <div className="character__name__EC">
            <button className="deleteCosplayEvent delete" onClick={() => {
                existDialog.current.showModal()
              }}>🗑️</button>
                { cosplay.character }
            </div>
            <ul className="item__list">
                {
                    cosplay.items.map(item => {
                        return <li key={item.id}>- {item.name}</li>
                    })
                }
            </ul>
        </section>
        </>
    )
}