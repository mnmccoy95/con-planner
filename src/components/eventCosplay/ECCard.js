import React, {useContext} from "react"
import { ECContext } from "./ECProvider"
import { useParams } from 'react-router-dom';

export const ECCard = ({ cosplay }) => {
    const { removeEC } = useContext(ECContext)
    const {id} = useParams()

    return (
        <section className="cosplayEvent">
            <div className="character__name">
            <button className="deleteCosplayEvent" onClick={() => {
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
    )
}