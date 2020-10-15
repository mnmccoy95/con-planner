import React, { useContext, useEffect } from "react"
import { EssentialContext } from "./EssProvider"
import { EssentialCard } from "./EssCard"
import { useHistory } from 'react-router-dom';

export const EssentialList = () => {
    const { essentials, getEssentials } = useContext(EssentialContext)
	
    useEffect(() => {
		getEssentials()
    }, [])

    const history = useHistory()

    return (
        <div className="essentials">
            <h2>Your Saved Essentials</h2>
            <button onClick={() => {history.push("/essentials/create")}}>
                    Add New Essential
            </button>
            {
            essentials.map(essential => {
                return <EssentialCard key={essential.id} essential={essential} />
            })
            }
        </div>
    )
}

