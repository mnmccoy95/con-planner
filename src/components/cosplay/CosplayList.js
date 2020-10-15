import React, { useContext, useEffect } from "react"
import { CosplayContext } from "./CosplayProvider"
import { CosplayCard } from "./CosplayCard"
import { useHistory } from 'react-router-dom';

export const CosplayList = () => {

    const { cosplays, getCosplays } = useContext(CosplayContext)
	
    useEffect(() => {
		getCosplays()
    }, [])

    const history = useHistory()

    return (
        <div className="cosplays">
            <h2>Your Saved Cosplays</h2>
          <button onClick={() => {history.push("/cosplays/create")}}>
                    Add New Cosplay
              </button>
            {
          cosplays.map(cosplay => {
            return <CosplayCard key={cosplay.id} cosplay={cosplay} />
          })
            }
        </div>
    )
}