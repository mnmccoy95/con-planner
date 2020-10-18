import React, { useContext, useState } from "react"
import { useHistory} from 'react-router-dom';
import { TaskContext } from "./TaskProvider";

export const TaskCard = ({ taskObj }) => {
    const { deleteTask, editTask, getTasksByCosplay } = useContext(TaskContext);

    const [taskItem, setTaskItem] = useState(taskObj)

    const history = useHistory()
    

    /**
     * Update taskObj complete in database depending on the boolean sent by the onChange
     * function for the checkbox input on a taskObj card. The id of the taskObj is also 
     * passed in and used to target the specific taskObj to update.
     *  */ 
    const setTaskcomplete = (event) => {
        const newTask = { ...taskItem } // spread operator, spreads an object into separate arguments

        // evaluate whatever is in the [], accesses .taskObj dynamically
        newTask[event.target.name] = taskItem.complete ? false : true; // what is in the form, named exactly like it is in state
        //update state with each keystroke
        setTaskItem(newTask) //  causes re-render
        editTask(newTask)
        .then(getTasksByCosplay(newTask.cosplayId))
    }

    return(
        <section className="taskObj">
            <input 
                type="checkbox" 
                id={`check--${taskObj.id}`} 
                name="complete" 
                value={`${taskObj.complete}`}
                checked={taskObj.complete}
                onChange={(e) => {
                    // pressing the check box here will set the 
                    // taskObj complete from 'uncompleted' (false) to 
                    // 'completed' (true)
                    setTaskcomplete(e); // change taskObj complete
                }}/>
            <label htmlFor={`taskObj${taskObj.id}`}>{`${taskObj.name}`}</label>
            <div className="taskActions">
            <button 
                type="button" 
                className="taskBtn-edit" 
                id={`editTask--${taskObj.id}`}
                onClick={
                    () => {
                        history.push(`/cosplays/tasks/edit/${taskObj.id}`)
                }}>✏️</button>

                <button 
                    type="button" 
                    className="taskBtn-delete" 
                    id={`deleteTask--${taskObj.id}`} 
                    onClick={
                        () => {
                            deleteTask(taskObj)
                    }}>🗑️</button>      
            </div>   
        </section>
    )


}