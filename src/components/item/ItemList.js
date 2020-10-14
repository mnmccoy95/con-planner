import React, { useContext, useEffect } from "react"
import { ItemContext } from "./ItemProvider"
import { ItemCard } from "./ItemCard"
import { useHistory, useParams } from 'react-router-dom';

export const ItemList = () => {

    const { items, getItemsByCosplay } = useContext(ItemContext)
    const {id} = useParams();
	
    useEffect(() => {
        console.log(id)
        getItemsByCosplay(id)
        .then(() => {
            console.log(id)
        })
    }, [])

    const history = useHistory()
    console.log(id)
    const getid = () => {
        
        console.log(id)
        if(id){
            return (
                <button onClick={() => {history.push(`/cosplays/items/create/${id}`)}}>
                    Add New Piece
                </button>
            )
        }
    }

    return (
        <div className="items">
            <h2>Cosplay Pieces</h2>
            {getid()}
            {
                items.map(item => {
                    return <ItemCard key={item.id} item={item} />
                })
            }
        </div>
    )
}

