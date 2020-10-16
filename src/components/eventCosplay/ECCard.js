import React, {useContext} from "react"
import { ECContext } from "./ECProvider"
import { useParams } from 'react-router-dom';

export const ECCard = ({ cosplay }) => {
    const { removeEC } = useContext(ECContext)
    const {id} = useParams()

    return (
        <section className="cosplayEvent">
            <h3 className="character__name">
                { cosplay.character }
                <button onClick={() => {
                removeEC(cosplay.id, parseInt(id))
              }}>Remove</button>
            </h3>
            <ul>
                {
                    cosplay.items.map(item => {
                        return <li key={item.id}>{item.name}</li>
                    })
                }
            </ul>
        </section>
    )
}