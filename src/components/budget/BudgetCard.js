import React, { useContext, useEffect, useState } from "react"
import { BudgetContext } from "./BudgetProvider"
import { HotelContext } from "../hotel/HotelProvider"
import { EventContext } from "../event/EventProvider"
import { useHistory, useParams } from 'react-router-dom';
import "./Budget.css"

export const BudgetCard = () => {

    const { budget, getBudgetByEvent, removeBudget } = useContext(BudgetContext)
    const { hotel, getHotelByEvent } = useContext(HotelContext)
    const { events, getEvents, getEventById } = useContext(EventContext)
    const [event, setEvent] = useState(EventContext)
    let {id} = useParams();

    useEffect(() => {
        getEvents()
        getBudgetByEvent(parseInt(id))
        getHotelByEvent(parseInt(id))
        getEventById(parseInt(id))
        .then(setEvent)
    }, [])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    const history = useHistory()
    const getid = () => {
        if(budget.length === 0){
            return (
                <button className="addNewBudget add" onClick={() => {history.push(`/events/budget/create/${id}`)}}>
                    +
                </button>
            )
        } else {
            return ( 
                <>
                <button className="deleteBudget delete" onClick={
                    () => {
                        removeBudget(budget[0])
                            .then(() => {
                                getBudgetByEvent(parseInt(id))
                            })
                    }
                }>🗑️</button>
                <button className="editBudget edit" onClick={() => { history.push(`/events/budget/edit/${id}`) }}>✏️</button>
                </>
            )
        }
    }

    const budgetInfo = () => {
        if(budget.length === 1){
            return ( <section className="budgetDetail">
                <div className="budgetAllowance">Allowance: <div className="number">{formatter.format(budget[0].allowance)}</div></div>
                <div className="budgetFood">Food: <div className="number">- {formatter.format(budget[0].foodExpenses)}</div></div>
                <div className="budgetMerch">Merch/Art: <div className="number">- {formatter.format(budget[0].merchExpenses)}</div></div>
                <div className="budgetTravel">Travel: <div className="number">- {formatter.format(budget[0].travelExpenses)}</div></div>
                <div className="budgetHotel">{hotelAddInfo()}</div>
                <div className="budgetBadge">{badgeAddInfo()}</div>
                <div className="budgetNet">{getTotal()}</div>
        </section>)
        }
    }

    const hotelAddInfo = () => {
        if(hotel[0]?.price) {
        if(budget[0].hotelAdd === true){
            if(budget[0].perPerson === true) {
                let cost
                if(!hotel[0].people | hotel[0].people === 0){
                    cost = hotel[0].price/1
                }else {
                    cost = hotel[0].price/hotel[0].people
                }

                return (
                    <>
                    <div>
                    Hotel Per Person: </div><div className="hotelCost">- {formatter.format(cost)}</div>
                    </>
                )
            } else {
                return (
                    <>
                    <div>
                    Hotel: </div><div className="hotelCost">- {formatter.format(hotel[0].price)}</div>
                    </>
                )
            }
        }} else {
            return (
                <>
                <div>
                Hotel: </div>
                </>
            )
        }
    }

    const badgeAddInfo = () => {
        if(event) {
        if(budget[0].badgeAdd === true){
            if(event.badgePrice){
                return (
                    <>
                    <div>
                    Badge: </div><div className="badgeCost">- {formatter.format(event.badgePrice)}</div>
                    </>
                )
            } else{
                return (
                    <>
                    <div>
                    Badge: 
                    </div>
                    </>
                )
            }
        } else {
            return (
                <>
                <div>
                Badge: 
                </div> 
                </>
            )
        }}
    }

    const getTotal = () => {

        const food = () => {
            if(budget[0].foodExpenses){
                return budget[0].foodExpenses
            }
            else {
                return 0
            }
        }

        const merch = () => {
            if(budget[0].merchExpenses){
                return budget[0].merchExpenses
            }
            else {
                return 0
            }
        }

        const travel = () => {
            if(budget[0].travelExpenses){
                return budget[0].travelExpenses
            }
            else {
                return 0
            }
        }

        const allowance = () => {
            if(budget[0].allowance){
                return budget[0].allowance
            }
            else {
                return 0
            }
        }
        let total = allowance() - (food() + merch() + travel())
        if(hotel[0]?.price && budget[0].hotelAdd === true && budget[0].perPerson !== true){
            total = total - hotel[0]?.price
        } else if (hotel[0]?.price && budget[0].hotelAdd === true && budget[0].perPerson === true){
            if(!hotel[0].people | hotel[0].people === 0){
                const cost = hotel[0].price/1
                total = total - cost
            }
            else {
                const cost = hotel[0].price/hotel[0].people
                total = total - cost
            }
        }

        if(event.badgePrice && budget[0].badgeAdd === true){
            total = total - event.badgePrice
        }

        if(total){
        return (
            <>
            Total: <div className="number">{formatter.format(total)}</div>
            </>
        )} else {
            return (<>
            Total: $ <div className="number">Complete Info for Total</div>
            </>)
        }
    }

    return (
        <div className="budget">
            <div className="budgetHeader">
            <div className="yourBudget">Budget</div>
            {getid()}
            </div>
            {budgetInfo()}
            
        </div>
    )
}