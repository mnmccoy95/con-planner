import React, {useContext} from "react"
import { EssentialContext } from "./EssProvider"
import { useHistory } from 'react-router-dom';

export const EssentialCard = ({ essential }) => {
    const { removeEssential } = useContext(EssentialContext)
    const history = useHistory()

    const modalDisplay = () => {
        const modal = document.querySelector("#myModal")
        modal.style.display = "block"
        modal.value = essential.id
    }
    
    return(
    <section className="essential">
        <div className="essential__name">
            { essential.name }
        </div>
        <div className="buttons">
        <button className="deleteEssential delete" onClick={() => {
            removeEssential(essential)
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