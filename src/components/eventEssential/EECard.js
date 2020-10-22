import React, {useContext} from "react"
import { EEContext } from "./EEProvider"

export const EECard = ({ EE }) => {
    const { getEEs, removeEE } = useContext(EEContext)

    return (
        <section className="essentialEvent">
            <div className="essential__name__EC">
            <button className="deleteEssentialEvent delete" onClick={() => {
                removeEE(EE)
                getEEs(EE.eventId)
              }}>🗑️</button>
                { EE.essential.name }
            </div>
        </section>
    )
}