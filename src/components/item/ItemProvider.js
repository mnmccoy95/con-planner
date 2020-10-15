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
    const [items, setItems] = useState([])

    const getItemsByCosplay = (cosplayId) => {
        return fetch(`http://localhost:8088/items?cosplayId=${cosplayId}`)
            .then(res => res.json())
            .then(setItems)
    }

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

    const getItemById = (id) => {
        return fetch(`http://localhost:8088/items/${id}`)
            .then(res => res.json())
    }

    const deleteItem = (item) => {
        return fetch(`http://localhost:8088/items/${item.id}`, {
            method: "DELETE"
        })
            .then(getItemsByCosplay)
    }

    const editItem = item => {
        return fetch(`http://localhost:8088/items/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
            .then(getItemsByCosplay)
    }

    return (
        <ItemContext.Provider value={{
            items, getItemsByCosplay, getItemById, deleteItem, editItem, addItem
        }}>
            {props.children}
        </ItemContext.Provider>
    )
}