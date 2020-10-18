import React, {useContext} from "react"
import { EEContext } from "./EEProvider"

export const EECard = ({ EE }) => {
    const { getEEs, removeEE } = useContext(EEContext)

    return (
        <section className="essentialEvent">
            <div className="essential__name">
            <button className="deleteEssentialEvent" onClick={() => {
                removeEE(EE)
                getEEs(EE.eventId)
              }}>🗑️</button>
                { EE.essential.name }
            </div>
        </section>
    )
}