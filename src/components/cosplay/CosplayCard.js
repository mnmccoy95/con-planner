import React from "react"
import { Link } from "react-router-dom"

export const CosplayCard = ({ cosplay }) => (
    <section className="cosplay">
        <h3 className="character__name">
            <Link to={`/cosplays/detail/${cosplay.id}`}>
                { cosplay.character }
            </Link>
        </h3>
        <button>Add to Event</button>
    </section>
)