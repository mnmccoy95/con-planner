import React, {useContext, useRef} from "react"
import { EEContext } from "./EEProvider"

export const EECard = ({ EE }) => {
    const { getEEs, removeEE } = useContext(EEContext)
    const existDialog = useRef()

    return (
        <section className="essentialEvent">
            <dialog className="logout--dialog" ref={existDialog}>
            <div>Are you sure you want to delete?</div>
            <button className="logout--yes" onClick={() => {
                removeEE(EE)
                getEEs(EE.eventId)
            }}>Delete</button>
            <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>
            <div className="essential__name__EC">
                <div className="EC__title">
                { EE.essential.name }
                </div>
                <button className="deleteEssentialEvent delete" onClick={() => {
                existDialog.current.showModal()
              }}>🗑️</button>
            </div>
        </section>
    )
}