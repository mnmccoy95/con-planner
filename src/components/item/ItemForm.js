import React, { useContext, useState, useEffect } from "react"
import { ItemContext } from "./ItemProvider"
import { useHistory, useParams } from 'react-router-dom';

export const ItemForm = (props) => {
    const { addItem } = useContext(ItemContext)

    //for edit, hold on to state of item in this view
    const [item, setItem] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {cosplayId} = useParams()
    const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
        //When changing a state object or array, 
        //always create a copy make changes, and then set state.
        const newItem = { ...item }
        //item is an object with properties. 
        //set the property to the new value
        newItem[event.target.name] = event.target.value
        //update state
        setItem(newItem)
    }

    const setCompletionStatus = (event) => {
        const newItem = { ...item } // spread operator, spreads an object into separate arguments
        // evaluate whatever is in the [], accesses item dynamically
        newItem[event.target.name] = item.complete ? false : true; // what is in the form, named exactly like it is in state
        //update state with each keystroke
        setItem(newItem) //  causes re-render
    }

    const setMakingStatus = (event) => {
        const newItem = { ...item } // spread operator, spreads an object into separate arguments
        // evaluate whatever is in the [], accesses item dynamically
        newItem[event.target.name] = item.making ? false : true; // what is in the form, named exactly like it is in state
        //update state with each keystroke
        setItem(newItem) //  causes re-render
    }
    
    useEffect(() => {
        setIsLoading(false)
    }, [])
    
    const constructItemObject = (evt) => {
        evt.preventDefault()
        //disable the button - no extra clicks
        setIsLoading(true);
        addItem({
            cosplayId: parseInt(cosplayId),
            name: item.name,
            complete: item.complete,
            making: item.making,
            cost: item.cost
        })
        .then(() => {
            // Clear inputs after save
            const clearer1 = document.querySelector("#itemName")
            const clearer2 = document.querySelector("#itemCost")
            const clearer3 = document.querySelector("#check--complete")
            const clearer4 = document.querySelector("#check--making")

            clearer1.value = ""
            clearer2.value = ""
            clearer3.value= false
            clearer4.value = false
            clearer3.checked = false
            clearer4.checked = false

            item.name = ""
            item.cost = ""
            item.complete = false
            item.making = false
            setIsLoading(false);
        })

    }

    return (
        <form className="ItemForm" onSubmit={constructItemObject}>
            <h2 className="ItemForm__title">Add Item</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="itemName">Item: </label>
                    <input type="text" id="itemName" name="name" autoFocus required autoFocus className="form-control" 
                    placeholder="Item name" 
                    onChange={handleControlledInputChange} 
                    defaultValue={item.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="itemCost">Cost: </label>
                    <input type="text" id="itemCost" name="cost" pattern="^^\d+(\.\d{2})?$" className="form-control" 
                    placeholder="Item Cost" 
                    onChange={handleControlledInputChange} 
                    defaultValue={item.cost}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="check--complete">Complete: </label>
                <input 
                    type="checkbox" 
                    id="check--complete"
                    name="complete" 
                    defaultValue={`${item.complete}`}
                    checked={item.complete}
                    onChange={(e) => {
                        // pressing the check box here will set the 
                        // item status from 'uncompleted' (false) to 
                        // 'completed' (true)
                        setCompletionStatus(e); // change item status
                    }}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="check--making">Making: </label>
                <input 
                    type="checkbox" 
                    id="check--making"
                    name="making" 
                    defaultValue={`${item.making}`}
                    checked={item.making}
                    onChange={(e) => {
                        // pressing the check box here will set the 
                        // making status from 'uncompleted' (false) to 
                        // 'completed' (true)
                        setMakingStatus(e); // change making status
                    }}/>
                </div>
            </fieldset>
            <button className="btn btn-primary" disabled={isLoading} 
                type="submit"
                >Save</button>
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    history.push(`/cosplays/detail/${cosplayId}`)
                    }}
                >Return</button>
            
        </form>
    )
}