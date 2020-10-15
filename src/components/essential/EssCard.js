import React, {useContext} from "react"
import { EssentialContext } from "./EssProvider"
import { useHistory } from 'react-router-dom';

export const EssentialCard = ({ essential }) => {
    const { removeEssential } = useContext(EssentialContext)
    const history = useHistory()
    
    return(
    <section className="essential">
        <h3 className="essential__name">
            { essential.name }
        </h3>
        <button onClick={() => {
            removeEssential(essential)
        }}>Delete Essential</button>
            
        <button onClick={() => {
            history.push(`/essentials/edit/${essential.id}`)
        }}>Edit Essential</button>
        <button>Add to Event</button>
    </section>
    )
}