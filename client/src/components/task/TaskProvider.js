import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const TaskContext = createContext()

/*
 This component establishes what data can be used.
 */
export const TaskProvider = (props) => {
    //sets initial state
    const [tasks, setTasks] = useState([])

    //get all tasks for specific cosplay
    const getTasksByCosplay = (cosplayId) => {
        return fetch(`http://localhost:8088/tasks?cosplayId=${parseInt(cosplayId)}`)
            .then(res => res.json())
            .then(setTasks)
    }

    //adds a task to the database
    const addTask = task => {
        return fetch("http://localhost:8088/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        }).then(getTasksByCosplay)
    }

    //gets a specific task's info
    const getTaskById = (id) => {
        return fetch(`http://localhost:8088/tasks/${id}`)
            .then(res => res.json())
    }

    //deletes a task from the database
    const deleteTask = (task) => {
        return fetch(`http://localhost:8088/tasks/${task.id}`, {
            method: "DELETE"
        }).then(()=>{getTasksByCosplay(task.cosplayId)})
    }

    //updates a specific task in the database
    const editTask = task => {
        return fetch(`http://localhost:8088/tasks/${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        }).then(getTasksByCosplay(task.cosplayId))
    }

    return (
        <TaskContext.Provider value={{
            tasks, getTasksByCosplay, getTaskById, deleteTask, editTask, addTask
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}