import React, { useContext, useEffect, useState } from "react"
import { CosplayContext } from "./CosplayProvider"
import { useParams, useHistory } from "react-router-dom"

export const CosplayDetail = () => {
    const { removeCosplay, getCosplayById } = useContext(CosplayContext)
	
	const [cosplay, setCosplay] = useState({})
	
	const {id} = useParams();
	const history = useHistory();

    useEffect(() => {
        getCosplayById(id)
        .then((response) => {
            setCosplay(response)
        })
	}, [])

    const completionStatus = () => {
        if(cosplay.complete === true){
            return(
                <>Completion Status: Complete</>
            )
        } else {
            return(
                <>Completion Status: Incomplete</>
            )
        }
    }

    return (
        <section className="cosplayDetail">
            <div className="cosplay-detail-character">{cosplay.character}</div>
            <div className="cosplay-detail-series">{cosplay.series}</div>
        <div className="cosplay-detail-completion">{completionStatus()}</div>
            <button onClick={
                () => {
                    removeCosplay(cosplay)
                        .then(() => {
                            history.push("/cosplays")
                        })
                }
            }>Delete Cosplay</button>
            
            <button onClick={() => {
                history.push(`/cosplays/edit/${cosplay.id}`)
            }}>Edit Cosplay</button>
        </section>
    )
}