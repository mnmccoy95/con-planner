import React, { useContext, useEffect, useState, useRef } from "react"
import { CosplayContext } from "./CosplayProvider"
import { useParams, useHistory } from "react-router-dom"
import { TaskList } from "../task/TaskList"
import { ItemList } from "../item/ItemList"

export const CosplayDetail = () => {
    //defines functions used
    const { removeCosplay, getCosplayById } = useContext(CosplayContext)
    
    //defines cosplay state
	const [cosplay, setCosplay] = useState({})
    
    //defines relevant info
	const {id} = useParams();
    const history = useHistory();
    const existDialog = useRef()

    //sets cosplay state to id in url
    useEffect(() => {
        getCosplayById(id)
        .then((response) => {
            setCosplay(response)
        })
	}, [])

    //displays relevant completion status
    const completionStatus = () => {
        if(cosplay.complete === true){
            return(
                <>Complete: ✔️</>
            )
        } else {
            return(
                <>Complete: ❌</>
            )
        }
    }

    //defines html for cosplay details
    return (
        <div className="cosplayDetailPageContainer margin">
            <dialog className="logout--dialog" ref={existDialog}>
                <div>Are you sure you want to delete?</div>
                <button className="logout--yes" onClick={() => {
                    removeCosplay(cosplay)
                    .then(() => {
                        history.push("/cosplays")
                    })   
                }}>Delete</button>
                <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>
            <div>
            <section className="cosplayDetail">
                <div className="cosplay-detail-character">{cosplay.character}
                <button className="deleteCosplay delete" onClick={
                    () => {
                        existDialog.current.showModal()
                        
                    }
                }>🗑️</button>
                
                <button className="editCosplay edit" onClick={() => {
                    history.push(`/cosplays/edit/${cosplay.id}`)
                }}>✏️</button>
                </div>
                <div className="cosplay-detail-series">{cosplay.series}</div>
                <div className="cosplay-detail-completion">{completionStatus()}</div>
            </section>
            <TaskList />
            </div>
            <div>
            <ItemList />
            </div>
        </div>
    )
}