import React, { useContext, useEffect } from "react"
import { TaskContext } from "./TaskProvider"
import { TaskCard } from "./TaskCard"
import { useHistory, useParams } from 'react-router-dom';
import "./Task.css"

export const TaskList = () => {

    const { tasks, getTasksByCosplay } = useContext(TaskContext)
    const {id} = useParams();
	
    useEffect(() => {
        getTasksByCosplay(parseInt(id))
    }, [])

    const history = useHistory()
    const getid = () => {
        if(id){
            const newId = parseInt(id)
            return (
                <button className="addNewTask" onClick={() => {history.push(`/cosplays/tasks/create/${newId}`)}}>
                    +
                </button>
            )
        }
    }

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