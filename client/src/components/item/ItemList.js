import React, { useContext, useEffect } from "react"
import { ItemContext } from "./ItemProvider"
import { ItemCard } from "./ItemCard"
import { useHistory, useParams } from 'react-router-dom';
import "./Item.css"

export const ItemList = () => {
    //defines info and function to be used
    const { items, getItemsByCosplay } = useContext(ItemContext)
    //defines relevant cosplayId
    const {id} = useParams();
    
    //gets all items associated with relevant cosplay
    useEffect(() => {
        getItemsByCosplay(parseInt(id))
    }, [])

    //used for navigating pages
    const history = useHistory()

    //shows item add button for current page's cosplay
    //only after id is defined
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

    //defines and returns base html for item list
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