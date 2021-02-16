import React, { useContext, useRef } from "react"
import { useHistory} from 'react-router-dom';
import { ItemContext } from "./ItemProvider";

export const ItemCard = ({ item }) => {
    //defines function to be used
    const { deleteItem } = useContext(ItemContext)

    //used for displaying delete confirmation dialog
    const existDialog = useRef()

    //used for navigating pages
    const history = useHistory()

    //displays relevant html if based on completion status
    const Complete = () => {
        if(item.complete === true){
            return (
                <div className="itemCompletion">Complete: ✔️</div>
            )
        } else {
            return (
                <div className="itemCompletion">Complete: ❌</div>
            )
        }
    }

    //displays relevant html based on if user is making the item
    const Making = () => {
        if(item.making === true){
            return (
                <div className="itemCompletion">Self Made: ✔️</div>
            )
        } else {
            return (
                <div className="itemCompletion">Self Made: ❌</div>
            )
        }
    }

    //returns html for a single item
    return(
        <section className="item">
            <dialog className="logout--dialog" ref={existDialog}>
                <div>Are you sure you want to delete?</div>
                <button className="logout--yes" onClick={() => {
                    deleteItem(item)
                }}>Delete</button>
                <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>
            <div className="item__name">
                { item.name } 
            </div>
            <div className="item__details">
                Cost: ${item.cost}
                {Complete()}
                {Making()}
            </div>
            <button className="deleteItem delete" onClick={() => {
                    existDialog.current.showModal()
                }}>🗑️</button>
            <button className="itemEdit edit" onClick={() => {
                    history.push(`/cosplays/items/edit/${item.id}`)
            }}>✏️</button>   
        </section>
    )
}