import React, {useContext, useRef} from "react"
import { ECContext } from "./ECProvider"
import { useParams } from 'react-router-dom';

export const ECCard = ({ cosplay }) => {
    const { removeEC } = useContext(ECContext)
    let {id} = useParams()
    const existDialog = useRef()

    
    const homeGrabber = () => {
        if(typeof(id) === "string"){
        } else {
            id = document.querySelector(".hidden").innerHTML
        }
    }

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