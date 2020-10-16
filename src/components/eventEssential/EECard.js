import React, {useContext} from "react"
import { EEContext } from "./EEProvider"
import { useParams } from 'react-router-dom';

export const EECard = ({ EE }) => {
    const { getEEs, removeEE } = useContext(EEContext)

    return (
        <section className="essentialEvent">
            <h3 className="essential__name">
                { EE.essential.name }
                <button onClick={() => {
                removeEE(EE)
                getEEs(EE.eventId)
              }}>Remove</button>
            </h3>
        </section>
    )
}