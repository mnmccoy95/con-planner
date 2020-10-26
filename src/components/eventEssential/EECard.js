import React, {useContext} from "react"
import { EEContext } from "./EEProvider"

export const EECard = ({ EE }) => {
    const { getEEs, removeEE } = useContext(EEContext)

    return (
        <section className="essentialEvent">
            <div className="essential__name__EC">
                <div className="EC__title">
                { EE.essential.name }
                </div>
                <button className="deleteEssentialEvent delete" onClick={() => {
                removeEE(EE)
                getEEs(EE.eventId)
              }}>🗑️</button>
            </div>
        </section>
    )
}