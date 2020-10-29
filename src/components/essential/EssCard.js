import React, {useContext, useRef} from "react"
import { EssentialContext } from "./EssProvider"
import { useHistory } from 'react-router-dom';

export const EssentialCard = ({ essential }) => {
    //defines function to be used
    const { removeEssential } = useContext(EssentialContext)
    //used for navigating pages
    const history = useHistory()
    //defines dialog box to be called on delete
    const existDialog = useRef()

    //displays modal for addint to event when called
    const modalDisplay = () => {
        const modal = document.querySelector("#myModal")
        modal.style.display = "block"
        modal.value = essential.id
    }
    
    //defines html for essential card
    return(
        <section className="essential">
            <dialog className="logout--dialog" ref={existDialog}>
                <div>Are you sure you want to delete?</div>
                <button className="logout--yes" onClick={() => {
                    removeEssential(essential)
                }}>Delete</button>
                <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>
            <div className="essential__name">
                { essential.name }
            </div>
            <div className="buttons">
                <button className="deleteEssential delete" onClick={() => {
                    existDialog.current.showModal()
                }}>🗑️</button>
                    
                <button className="essEdit edit" onClick={() => {
                    history.push(`/essentials/edit/${essential.id}`)
                }}>✏️</button>
                <button className="addEssEvent add" onClick={() => {
                    modalDisplay()
                }}>📅</button>
            </div>
        </section>
    )
}