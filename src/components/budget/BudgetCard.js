import React, { useContext, useEffect } from "react"
import { BudgetContext } from "./BudgetProvider"
import { HotelContext } from "../hotel/HotelProvider"
import { EventContext } from "../event/EventProvider"
import { useHistory, useParams } from 'react-router-dom';
import "./Budget.css"

export const BudgetCard = () => {

    const { budget, getBudgetByEvent, removeBudget } = useContext(BudgetContext)
    const { hotel, getHotelByEvent } = useContext(HotelContext)
    const { event, getEventById } = useContext(EventContext)
    const {id} = useParams();
	
    useEffect(() => {
        getBudgetByEvent(parseInt(id))
        getHotelByEvent(parseInt(id))
        getEventById(parseInt(id))
    }, [])

    const history = useHistory()
    const getid = () => {
        if(budget.length === 0){
            return (
                <button className="addNewBudget" onClick={() => {history.push(`/events/budget/create/${id}`)}}>
                    +
                </button>
            )
        } else {
            return ( 
                <>
                <button className="deleteBudget" onClick={
                    () => {
                        removeBudget(budget[0])
                            .then(() => {
                                getBudgetByEvent(parseInt(id))
                            })
                    }
                }>🗑️</button>
                <button className="editBudget" onClick={() => { history.push(`/events/budget/edit/${id}`) }}>✏️</button>
                </>
            )
        }
    }

    const budgetInfo = () => {
        if(budget.length === 1){
            return ( <section className="budgetDetail">
        </section>)
        }
    }

    return (
        <div className="budget">
            <div className="budgetHeader">
            <div className="yourBudget">Your Budget</div>
            {getid()}
            </div>
            {budgetInfo()}
            
        </div>
    )
}