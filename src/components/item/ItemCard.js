import React, { useContext, useParams } from "react"
import { useHistory} from 'react-router-dom';
import { ItemContext } from "./ItemProvider";

export const ItemCard = ({ item }) => {
    const { deleteItem } = useContext(ItemContext)
    

    const history = useHistory()
    const Complete = () => {
        if(item.complete === true){
            return (
                <div className="itemCompletion">Complete: Yes</div>
            )
        } else {
            return (
                <div className="itemCompletion">Complete: No</div>
            )
        }
    }
    const Making = () => {
        if(item.making === true){
            return (
                <div className="itemCompletion">Self Made: Yes</div>
            )
        } else {
            return (
                <div className="itemCompletion">Self Made: No</div>
            )
        }
    }

    return(
    <section className="item">
        <div className="item__name">
            { item.name } 
        </div>
        <div className="item__details">
            Cost: ${item.cost}
            {Complete()}
            {Making()}
        </div>
        <button onClick={() => {
                history.push(`/cosplays/items/edit/${item.id}`)
            }}>✏️</button>
            <button onClick={() => {
                deleteItem(item)
            }}>🗑️</button>
    </section>
)}