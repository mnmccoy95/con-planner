import React, {useContext} from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { CosplayContext } from "./CosplayProvider"

export const CosplayCard = ({ cosplay }) => {

    const { removeCosplay } = useContext(CosplayContext)

    const modalDisplay = () => {
        const modal = document.querySelector("#myModal")
        modal.style.display = "block"
        modal.value = cosplay.id
    }
    
    const history = useHistory()

    return (
    <section className="cosplay">
        
        <div className="character__name">
            <Link to={`/cosplays/detail/${cosplay.id}`}>
                { cosplay.character }
            </Link>
        </div>
        <div className="buttons">
        <button className="deleteCosplay delete"onClick={
                () => {
                    removeCosplay(cosplay)
                        .then(() => {
                            history.push("/cosplays")
                        })
                }
            }>🗑️</button>
        <button className="addCosplayToEvent add" onClick={() => {
            modalDisplay()
        }}>📅</button>
        </div>
    </section>
    )
}