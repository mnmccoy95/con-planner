import React, { useContext, useEffect } from "react"
import { ItemContext } from "./ItemProvider"
import { ItemCard } from "./ItemCard"
import { useHistory, useParams } from 'react-router-dom';
import "./Item.css"

export const ItemList = () => {

    const { items, getItemsByCosplay } = useContext(ItemContext)
    const {id} = useParams();
	
    useEffect(() => {
        getItemsByCosplay(parseInt(id))
    }, [])

    const history = useHistory()
    const getid = () => {
        if(id){
            const newId = parseInt(id)
            return (
                <button className="addNewItem add" onClick={() => {history.push(`/cosplays/items/create/${newId}`)}}>
                    +
                </button>
            )
        }
    }

    return (
        <div className="items">
            <div className="itemHeader">
            <div>Cosplay Pieces</div>
            {getid()}
            </div>
            <div className="allItems">
            {
                items.map(item => {
                    return <ItemCard key={item.id} item={item} />
                })
            }
            </div>
        </div>
    )
}