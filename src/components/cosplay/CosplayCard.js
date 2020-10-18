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
        
        <div className="character__name">
            <Link to={`/cosplays/detail/${cosplay.id}`}>
                { cosplay.character }
            </Link>
        </div>
        <button className="addCosplayToEvent" onClick={() => {
            modalDisplay()
        }}>📅</button>
    </section>
    )
}