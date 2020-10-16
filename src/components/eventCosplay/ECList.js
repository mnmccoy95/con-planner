import React, { useContext, useEffect, useState } from "react"
import { ECContext } from "./ECProvider"
import { ECCard } from "./ECCard"
import { useParams } from 'react-router-dom';
import { CosplayContext } from "../cosplay/CosplayProvider"

export const ECList = () => {
    const { ECs, getECs } = useContext(ECContext)
    const { getCosplayByIdWithItems } = useContext(CosplayContext)
    const {id} = useParams();
    let items

    useEffect(() => {
        getECs(id)
    }, [])
    //try generating string to use in url for cosplay and item get
    //then set cosplays to that and use it as state
    //then map over that to get proper render
    //hope that works


    const getCosplayItems = () => {
        if(ECs){
            ECs.map( EC => {
                getCosplayByIdWithItems(EC.cosplayId)
                .then((response) => {
                    EC.items = response.items
                    return response.items.map(item => {
                        return <div key={item.id}>{item.name}</div>
                    })
                })

            })
            console.log(ECs)
            items = ECs
            return items.map(EC => {
                return <ECCard key={EC.id} EC={EC} />
            })
        } else {
            return (<>dog</>)
        }
    }

    return (<>{getCosplayItems()}</>)
}

