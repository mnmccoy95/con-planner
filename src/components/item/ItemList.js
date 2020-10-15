import React, { useContext, useEffect } from "react"
import { ItemContext } from "./ItemProvider"
import { ItemCard } from "./ItemCard"
import { useHistory, useParams } from 'react-router-dom';

export const ItemList = () => {

    const { items, getItemsByCosplay } = useContext(ItemContext)
    const {id} = useParams();
	
    useEffect(() => {
        getItemsByCosplay(id)
    }, [])

    const history = useHistory()
    const getid = () => {
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

