import React, { useContext, useState, useEffect } from "react"
import { TaskContext } from "./TaskProvider"
import { useHistory, useParams } from 'react-router-dom';

export const TaskEdit = (props) => {
    //defines functions to be used
    const { getTaskById, editTask } = useContext(TaskContext)

    //for edit, hold on to state of task in this view
    const [task, setTask] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    //defines id for relevant task
    const {taskId} = useParams()
    //used for navigating pages
    const history = useHistory()

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
        //When changing a state object or array, 
        //always create a copy make changes, and then set state.
        const newTask = { ...task }
        //task is an object with properties. 
        //set the property to the new value
        newTask[event.target.name] = event.target.value
        //update state
        setTask(newTask)
    }

    //updates task completion status based on checkbox
    const setCompletionStatus = (event) => {
        const newTask = { ...task } // spread operator, spreads an object into separate arguments
        // evaluate whatever is in the [], accesses task dynamically
        newTask[event.target.name] = task.complete ? false : true; // what is in the form, named exactly like it is in state
        setTask(newTask) //  causes re-render
    }

    //get task based on id in url
    useEffect(() => {
        getTaskById(taskId)
        .then(task => {
            setTask(task)
            setIsLoading(false)
        })
    }, [])
    
    //updates task in database
    const constructTaskObject = (evt) => {
        evt.preventDefault()
        //disable the button - no extra clicks
        setIsLoading(true);
        //PUT - edit
        editTask({
            id: taskId,
            cosplayId: task.cosplayId,
            name: task.name,
            complete: task.complete
        })
        .then(() => history.push(`/cosplays/detail/${task.cosplayId}`))    
    }
    
    //defines and returns html for task form
    return (
        <form className="TaskForm margin" onSubmit={constructTaskObject}>
            <h2 className="TaskForm__title">Edit Task</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="taskName">Task: </label>
                    <input type="text" id="taskName" name="name" required autoFocus className="form-control" 
                    placeholder="task" 
                    onChange={handleControlledInputChange} 
                    defaultValue={task.name}/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="taskComplete">Complete: </label>
                <input 
                    type="checkbox" 
                    id={`check--complete`} 
                    name="complete" 
                    defaultValue={`${task.complete}`}
                    checked={task.complete}
                    onChange={(e) => {
                        // pressing the check box here will set the 
                        // task status from 'uncompleted' (false) to 
                        // 'completed' (true)
                        setCompletionStatus(e); // change task status
                    }}/>
            </fieldset>
            <button className="btn btn-primary add"
                disabled={isLoading}
                >Save Task</button>
        </form>
    )
}