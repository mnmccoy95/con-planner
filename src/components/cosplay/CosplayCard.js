import React from "react"
import { Link } from "react-router-dom"

export const CosplayCard = ({ cosplay }) => {
    const modalDisplay = () => {
        const modal = document.querySelector("#myModal")
        modal.style.display = "block"
        modal.value = cosplay.id
    }
    
    return (
    <section className="cosplay">
        
        <h3 className="character__name">
            <Link to={`/cosplays/detail/${cosplay.id}`}>
                { cosplay.character }
            </Link>
        </h3>
        <button onClick={() => {
            modalDisplay()
        }}>Add to Event</button>
    </section>
    )
}