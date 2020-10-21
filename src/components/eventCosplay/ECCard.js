import React, {useContext} from "react"
import { ECContext } from "./ECProvider"
import { useParams } from 'react-router-dom';

export const ECCard = ({ cosplay }) => {
    const { removeEC } = useContext(ECContext)
    let {id} = useParams()
    
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
            <div className="character__name">
            <button className="deleteCosplayEvent delete" onClick={() => {
                removeEC(cosplay.id, parseInt(id))
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