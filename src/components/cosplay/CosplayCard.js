import React, {useContext, useRef} from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { CosplayContext } from "./CosplayProvider"

export const CosplayCard = ({ cosplay }) => {

    const { removeCosplay } = useContext(CosplayContext)
    const existDialog = useRef()
  
    const modalDisplay = () => {
        const modal = document.querySelector("#myModalCos")
        modal.style.display = "block"
        modal.value = cosplay.id
    }
    
    const history = useHistory()

    const button = () => {
        if(window.location.href.includes("cosplay")){
            return (
                <button className="deleteCosplay delete"onClick={
                    () => {
                        existDialog.current.showModal()
                        
                    }
                }>🗑️</button>
            )
        }
    }

    return (
    <section className="cosplay">
        <dialog className="logout--dialog" ref={existDialog}>
            <div>Are you sure you want to delete?</div>
            <button className="logout--yes" onClick={() => {
                removeCosplay(cosplay)
                .then(() => {
                    if (window.location.href.includes("cosplays")){
                    history.push("/cosplays")}
                    else {
                    }
                })   
            }}>Delete</button>
            <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
        </dialog>
        <div className="character__name">
            <Link to={`/cosplays/detail/${cosplay.id}`}>
                { cosplay.character }
            </Link>
        </div>
        <div className="buttons">
        {button()}
        <button className="addCosplayToEvent add" onClick={() => {
            modalDisplay()
        }}>📅</button>
        </div>
    </section>
    )
}