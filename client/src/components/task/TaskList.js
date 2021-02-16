import React, { useContext, useEffect } from "react"
import { TaskContext } from "./TaskProvider"
import { TaskCard } from "./TaskCard"
import { useHistory, useParams } from 'react-router-dom';
import "./Task.css"

export const TaskList = () => {

    //defines info and function to be used
    const { tasks, getTasksByCosplay } = useContext(TaskContext)
    //defines relevant cosplayId
    const {id} = useParams();
    
    //gets relevant tasks based on cosplayId
    useEffect(() => {
        getTasksByCosplay(parseInt(id))
    }, [])

    //used for navigating pages
    const history = useHistory()

    //if cosplayId exists, display button for adding more tasks for that id
    const getid = () => {
        if(id){
            const newId = parseInt(id)
            return (
                <button className="addNewTask add" onClick={() => {history.push(`/cosplays/tasks/create/${newId}`)}}>
                    +
                </button>
            )
        }
    }

    //defines and returns base html for task list
    return (
        <div className="tasks">
            <div className="taskHeader">
            <div>To Do List</div>
            {getid()}
            </div>
            <div className="allTasks">
            {
                tasks.map(taskObj => {
                    return <TaskCard key={taskObj.id} taskObj={taskObj} />
                })
            }
            </div>
        </div>
    )
}