import React, { useContext, useState, useEffect } from "react"
import { ItemContext } from "./ItemProvider"
import { useHistory, useParams } from 'react-router-dom';

export const ItemEdit = (props) => {
    //defines functions to be used
    const { getItemById, editItem } = useContext(ItemContext)

    //for edit, hold on to state of item in this view
    const [item, setItem] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    //defines itemId to be edited
    const {itemId} = useParams()

    //used for navigating pages
    const history = useHistory()

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

    //changes completion status based on checkbox
    const setCompletionStatus = (event) => {
        const newItem = { ...item } // spread operator, spreads an object into separate arguments
        // evaluate whatever is in the [], accesses item dynamically
        newItem[event.target.name] = item.complete ? false : true; // what is in the form, named exactly like it is in state
        setItem(newItem) //  causes re-render
    }

    //changes making status based on checkbox
    const setMakingStatus = (event) => {
        const newItem = { ...item } // spread operator, spreads an object into separate arguments
        // evaluate whatever is in the [], accesses item dynamically
        newItem[event.target.name] = item.making ? false : true; // what is in the form, named exactly like it is in state
        setItem(newItem) //  causes re-render
    }
    
    //gets relevant item info from itemId
    useEffect(() => {
        getItemById(itemId)
        .then(item => {
            setItem(item)
            setIsLoading(false)
        })
    }, [])
    
    //updates item in database
    const constructItemObject = (evt) => {
        evt.preventDefault()
        //disable the button - no extra clicks
        setIsLoading(true);
        //PUT - edit
        editItem({
            id: itemId,
            cosplayId: item.cosplayId,
            name: item.name,
            complete: item.complete,
            making: item.making,
            cost: item.cost
        })
        .then(() => history.push(`/cosplays/detail/${item.cosplayId}`))    
    }
    
    //defines and returns html for item edit form
    return (
        <form className="ItemForm margin" onSubmit={constructItemObject}>
            <h2 className="ItemForm__title">Edit Piece</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="itemName">Item: </label>
                    <input type="text" id="itemName" name="name" required autoFocus className="form-control" 
                    placeholder="item name" 
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
                <label htmlFor="itemComplete">Complete: </label>
                <input 
                    type="checkbox" 
                    id={`check--complete`} 
                    name="complete" 
                    defaultValue={`${item.complete}`}
                    checked={item.complete}
                    onChange={(e) => {
                        // pressing the check box here will set the 
                        // item status from 'uncompleted' (false) to 
                        // 'completed' (true)
                        setCompletionStatus(e); // change item status
                    }}/>
            </fieldset>
            <fieldset>
                <label htmlFor="itemMaking">Making: </label>
                <input 
                    type="checkbox" 
                    id={`check--making`} 
                    name="making" 
                    defaultValue={`${item.making}`}
                    checked={item.making}
                    onChange={(e) => {
                        // pressing the check box here will set the 
                        // making status from 'uncompleted' (false) to 
                        // 'completed' (true)
                        setMakingStatus(e); // change making status
                    }}/>
            </fieldset>
            <button className="btn btn-primary add"
                type="submit"
                disabled={isLoading}
                >Save Item</button>
        </form>
    )
}