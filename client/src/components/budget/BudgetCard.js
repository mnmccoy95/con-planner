import React, { useContext, useEffect, useState, useRef } from "react"
import { BudgetContext } from "./BudgetProvider"
import { HotelContext } from "../hotel/HotelProvider"
import { EventContext } from "../event/EventProvider"
import { useHistory, useParams } from 'react-router-dom';
import "./Budget.css"

export const BudgetCard = () => {

    //defines info that will be used
    const { budget, getBudgetByEvent, removeBudget } = useContext(BudgetContext)
    const { hotel, getHotelByEvent } = useContext(HotelContext)
    const { getEvents, getEventById } = useContext(EventContext)
    const [event, setEvent] = useState(EventContext)
    let {id} = useParams();
    const existDialog = useRef()

    //gets relevant info from other providers
    useEffect(() => {
        getEvents()
        getBudgetByEvent(parseInt(id))
        getHotelByEvent(parseInt(id))
        getEventById(parseInt(id))
        .then(setEvent)
    }, [])

    //used for formatting monetary values
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    //used for navigating to other pages
    const history = useHistory()

    //verifies that a budget exists for the given event
    //if nonexistant, displays a button to add one
    //if existing, displays buttons for deleting/editing
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
                <dialog className="logout--dialog" ref={existDialog}>
                    <div>Are you sure you want to delete?</div>
                    <button className="logout--yes" onClick={() => {
                        removeBudget(budget[0])
                        .then(() => {
                            getBudgetByEvent(parseInt(id))
                        })   
                        }}>Delete</button>
                    <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
                </dialog>
                <button className="deleteBudget delete" onClick={
                    () => {
                        existDialog.current.showModal()
                    }
                }>🗑️</button>
                <button className="editBudget edit" onClick={() => { history.push(`/events/budget/edit/${id}`) }}>✏️</button>
                </>
            )
        }
    }

    //defines the info to display about the budget
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

    //defines budget info about the event's hotel
    //if the price exists, is added, and is devided by person
    //displays the price devided by number of people
    //without people, displays entire price
    //if not added or nonexistant, displays an empty cell
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
                            Hotel Per Person: </div><div className="hotelCost">- {formatter.format(cost)}
                        </div>
                        </>
                    )
                } else {
                    return (
                        <>
                        <div>
                            Hotel: </div><div className="hotelCost">- {formatter.format(hotel[0].price)}
                        </div>
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

    //similar to hotelAddInfo
    //displays badge price if existing and added
    //otherwise displays blank cell
    const badgeAddInfo = () => {
        if(event) {
            if(budget[0].badgeAdd === true){
                if(event.badgePrice){
                    return (
                        <>
                        <div>
                            Badge: </div><div className="badgeCost">- {formatter.format(event.badgePrice)}
                        </div>
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

    //calculates the overall net price
    const getTotal = () => {

        //checks if food budget exists
        //otherwise, set to 0
        const food = () => {
            if(budget[0].foodExpenses){
                return budget[0].foodExpenses
            }
            else {
                return 0
            }
        }

        //checks if merch budget exists
        //otherwise, set to 0
        const merch = () => {
            if(budget[0].merchExpenses){
                return budget[0].merchExpenses
            }
            else {
                return 0
            }
        }

        //checks if travel budget exists
        //otherwise, set to 0
        const travel = () => {
            if(budget[0].travelExpenses){
                return budget[0].travelExpenses
            }
            else {
                return 0
            }
        }

        //checks if allowance budget exists
        //otherwise, set to 0
        //(should always exist, as it is required, but this is a failsafe)
        const allowance = () => {
            if(budget[0].allowance){
                return budget[0].allowance
            }
            else {
                return 0
            }
        }

        //defines initial total
        let total = allowance() - (food() + merch() + travel())

        //subtracts relevant hotel price and division from total
        if(hotel[0]?.price && budget[0].hotelAdd === true && budget[0].perPerson !== true){
            total = total - hotel[0]?.price
        } else if (hotel[0]?.price && budget[0].hotelAdd === true && budget[0].perPerson === true){
            if(!hotel[0].people | hotel[0].people === 0){
                const cost = hotel[0].price/1
                total = total - cost
            } else {
                const cost = hotel[0].price/hotel[0].people
                total = total - cost
            }
        }

        //subtracts relevant badge price from total
        if(event.badgePrice && budget[0].badgeAdd === true){
            total = total - event.badgePrice
        }

        //displays the total if it exists
        //(should always exist, but this is a failsafe)
        if(total){
            return (
                <>
                Total: <div className="number">{formatter.format(total)}</div>
                </>
            )
        } else {
            return (<>
            Total: $ <div className="number">Complete Info for Total</div>
            </>)
        }
    }

    //defines base html and containers for budget card
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