import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const ItemContext = createContext()

/*
 This component establishes what data can be used.
 */
export const ItemProvider = (props) => {
    //sets initial state
    const [items, setItems] = useState([])

    //gets all items for a particular cosplay
    const getItemsByCosplay = (cosplayId) => {
        return fetch(`http://localhost:8088/items?cosplayId=${parseInt(cosplayId)}`)
            .then(res => res.json())
            .then(setItems)
    }

    //adds new item to database
    const addItem = item => {
        return fetch("http://localhost:8088/items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(getItemsByCosplay)
    }

    //gets specific item from databse
    const getItemById = (id) => {
        return fetch(`http://localhost:8088/items/${id}`)
            .then(res => res.json())
    }

    //deletes specific item from database
    const deleteItem = (item) => {
        return fetch(`http://localhost:8088/items/${item.id}`, {
            method: "DELETE"
        })
            .then(()=>{getItemsByCosplay(item.cosplayId)})
    }

    //updates specific item in database
    const editItem = item => {
        return fetch(`http://localhost:8088/items/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
        .then(()=>{getItemsByCosplay(item.cosplayId)})
    }

    return (
        <ItemContext.Provider value={{
            items, getItemsByCosplay, getItemById, deleteItem, editItem, addItem
        }}>
            {props.children}
        </ItemContext.Provider>
    )
}