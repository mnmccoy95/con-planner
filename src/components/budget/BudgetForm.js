import React, { useContext, useState, useEffect } from "react"
import { BudgetContext } from "./BudgetProvider"
import { useHistory, useParams } from 'react-router-dom';

export const BudgetForm = (props) => {
    const { addBudget, getBudgetByEventId, editBudget } = useContext(BudgetContext)

    //for edit, hold on to state of budget in this view
    const [budget, setBudget] = useState({})

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {eventId} = useParams();
    const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
        //When changing a state object or array, 
        //always create a copy make changes, and then set state.
        const newBudget = { ...budget }
        //budget is an object with properties. 
        //set the property to the new value
        newBudget[event.target.name] = event.target.value
        //update state
        setBudget(newBudget)
    }

    //getBudgetByEvent
    useEffect(() => {
        if (window.location.href.includes("edit")){
            if(eventId){
            getBudgetByEventId(eventId)
                .then(budget => {
                    setBudget(budget[0])
                    setIsLoading(false)
                })}
        } else {
            setIsLoading(false)
        }

    }, [])
    
    const setHotelStatus = (event) => {
        const newBudget = { ...budget } // spread operator, spreads an object into separate arguments
        // evaluate whatever is in the [], accesses hotel dynamically
        newBudget[event.target.name] = budget.hotelAdd ? false : true; // what is in the form, named exactly like it is in state
        //update state with each keystroke
        setBudget(newBudget) //  causes re-render
    }

    const setPersonStatus = (event) => {
        const newBudget = { ...budget } // spread operator, spreads an object into separate arguments
        // evaluate whatever is in the [], accesses hotel dynamically
        newBudget[event.target.name] = budget.perPerson ? false : true; // what is in the form, named exactly like it is in state
        //update state with each keystroke
        setBudget(newBudget) //  causes re-render
    }

    const setBadgeStatus = (event) => {
        const newBudget = { ...budget } // spread operator, spreads an object into separate arguments
        // evaluate whatever is in the [], accesses hotel dynamically
        newBudget[event.target.name] = budget.badgeAdd ? false : true; // what is in the form, named exactly like it is in state
        //update state with each keystroke
        setBudget(newBudget) //  causes re-render
    }

    const constructBudgetObject = (evt) => {
        evt.preventDefault()
            //disable the button - no extra clicks
            setIsLoading(true);
            if (window.location.href.includes("edit")){
                //PUT - update
                editBudget({
                    id: budget.id,
                    eventId: parseInt(eventId),
                    allowance: parseFloat(budget.allowance),
                    foodExpenses: parseFloat(budget.foodExpenses),
                    merchExpenses: parseFloat(budget.merchExpenses),
                    travelExpenses: parseFloat(budget.travelExpenses),
                    hotelAdd: budget.hotelAdd,
                    perPerson: budget.perPerson,
                    badgeAdd: budget.badgeAdd
                })
                .then(() => history.push(`/events/detail/${eventId}`))
            }else {
                //POST - add
                addBudget({
                    eventId: parseInt(eventId),
                    allowance: parseFloat(budget.allowance),
                    foodExpenses: parseFloat(budget.foodExpenses),
                    merchExpenses: parseFloat(budget.merchExpenses),
                    travelExpenses: parseFloat(budget.travelExpenses),
                    hotelAdd: budget.hotelAdd,
                    perPerson: budget.perPerson,
                    badgeAdd: budget.badgeAdd
                })
                .then(() => history.push(`/events/detail/${eventId}`))
            }
        }
    
    return (
        <form className="budgetForm margin" onSubmit={constructBudgetObject}>
            <h2 className="budgetForm__title">Your Budget</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="allowance">Your allowance: </label>
                    <input type="text" id="allowance" name="allowance" pattern="^\d+(\.\d{2})?$" autoFocus required className="form-control" 
                    placeholder="Spending Money" 
                    onChange={handleControlledInputChange} 
                    defaultValue={budget.allowance}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="foodCost">Food expenses: </label>
                    <input type="text" id="foodCost" name="foodExpenses" pattern="^\d+(\.\d{2})?$" className="form-control" 
                    placeholder="Food Money" 
                    onChange={handleControlledInputChange} 
                    defaultValue={budget.foodExpenses}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="merchCost">Merch/Art expenses: </label>
                    <input type="text" id="merchCost" name="merchExpenses" pattern="^\d+(\.\d{2})?$" className="form-control" 
                    placeholder="Merch/Art Money" 
                    onChange={handleControlledInputChange} 
                    defaultValue={budget.merchExpenses}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="travelCost">Travel expenses: </label>
                    <input type="text" id="travelCost" name="travelExpenses" pattern="^^\d+(\.\d{2})?$" className="form-control" 
                    placeholder="Travel Money" 
                    onChange={handleControlledInputChange} 
                    defaultValue={budget.travelExpenses}/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="hotelBudgetAdd">Add Hotel to Budget? </label>
                <input 
                    type="checkbox" 
                    id={`check--hotelBudget`} 
                    name="hotelAdd" 
                    defaultValue={`${budget.hotelAdd}`}
                    checked={budget.hotelAdd}
                    onChange={(e) => {
                        // pressing the check box here will set the 
                        // hotel status from 'not purchased' (false) to 
                        // 'purchased' (true)
                        setHotelStatus(e); // change hotel purchase status
                    }}/>
            </fieldset>
            <fieldset>
                <label htmlFor="hotelPersonBudget">Divide Hotel Cost by Person? </label>
                <input 
                    type="checkbox" 
                    id={`check--HotelDivide`} 
                    name="perPerson" 
                    defaultValue={`${budget.perPerson}`}
                    checked={budget.perPerson}
                    onChange={(e) => {
                        // pressing the check box here will set the 
                        // hotel status from 'not purchased' (false) to 
                        // 'purchased' (true)
                        setPersonStatus(e); // change hotel purchase status
                    }}/>
            </fieldset>
            <fieldset>
                <label htmlFor="badgeBudgetAdd">Add Badge to Budget? </label>
                <input 
                    type="checkbox" 
                    id={`check--badgeBudget`} 
                    name="badgeAdd" 
                    defaultValue={`${budget.badgeAdd}`}
                    checked={budget.badgeAdd}
                    onChange={(e) => {
                        // pressing the check box here will set the 
                        // hotel status from 'not purchased' (false) to 
                        // 'purchased' (true)
                        setBadgeStatus(e); // change hotel purchase status
                    }}/>
            </fieldset>
            <button className="btn btn-primary add"
                type="submit"
                disabled={isLoading}
                >Save Budget</button>
        </form>
    )
}