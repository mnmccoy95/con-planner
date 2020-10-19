import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const BudgetContext = createContext()

/*
 This component establishes what data can be used.
 */
export const BudgetProvider = (props) => {
    const [budget, setBudget] = useState({})

    const getBudgetByEvent = (eventId) => {
        return fetch(`http://localhost:8088/budgets?eventId=${eventId}&_expand=event`)
            .then(res => res.json())
            .then(setBudget)
    }

    const getBudgetByEventId = (eventId) => {
        return fetch(`http://localhost:8088/budgets?eventId=${eventId}`)
            .then(res => res.json())
    }

    const addBudget = budget => {
        return fetch("http://localhost:8088/budgets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(budget)
        })
            .then(getBudgetByEvent(budget.eventId))
    }

    const removeBudget = budget => {
        return fetch(`http://localhost:8088/budgets/${budget.id}`, {
            method: "DELETE"
        })
            .then(getBudgetByEvent(budget.eventId))
    }

    const editBudget = budget => {
        return fetch(`http://localhost:8088/budgets/${budget.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(budget)
        })
            .then(getBudgetByEvent(budget.eventId))
    }

    return (
        <BudgetContext.Provider value={{
            budget, getBudgetByEvent, getBudgetByEventId, addBudget, removeBudget, editBudget
        }}>
            {props.children}
        </BudgetContext.Provider>
    )
}