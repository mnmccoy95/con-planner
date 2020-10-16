import React, { useContext, useEffect, useState } from "react"
import { ECContext } from "./ECProvider"
import { ECCard } from "./ECCard"
import { useParams } from 'react-router-dom';
import { CosplayContext } from "../cosplay/CosplayProvider"

export const ECList = () => {
    const { ECs, getECs } = useContext(ECContext)
    const { getCosplayByIdWithItems } = useContext(CosplayContext)
    const [cosplayEvents, setCosplayEvents] = useState([])
    const {id} = useParams();
    let url = ""

    useEffect(() => {
        getECs(parseInt(id))
        url = ""
    }, [])

    useEffect(() => {
        url = ""
        const cosplayIds = ECs.map((EC) => {
            return EC.cosplayId
        })
        url = cosplayIds.map((cosplay) => {
            return `id=${cosplay}`
        }).join("&")

        if(url !== ""){
        getCosplayByIdWithItems(url)
        .then((response) => {
                setCosplayEvents(response)
        })} else {
            setCosplayEvents([])
        }
        
    }, [getECs])

    return (
        <>
        <div className="suitcase-container">
            <div className="suitcase-header">Suitcase</div>
            {cosplayEvents.map(cosplay => {
                return <ECCard key={cosplay.id} cosplay={cosplay} />
            })}
        </div>
        </>
    )
}

