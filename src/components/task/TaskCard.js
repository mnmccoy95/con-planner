import React, { useContext, useState, useRef } from "react"
import { useHistory} from 'react-router-dom';
import { TaskContext } from "./TaskProvider";

export const TaskCard = ({ taskObj }) => {
    //defines functions to be used
    const { deleteTask, editTask, getTasksByCosplay } = useContext(TaskContext);

    //sets tasks state
    const [taskItem, setTaskItem] = useState(taskObj)

    //used for navigating pages
    const history = useHistory()

    //used to display delete dialog
    const existDialog = useRef()
    

    /**
     * Update taskObj complete in database depending on the boolean sent by the onChange
     * function for the checkbox input on a taskObj card. The id of the taskObj is also 
     * passed in and used to target the specific taskObj to update.
     *  */ 
    const setTaskcomplete = (event) => {
        const newTask = { ...taskItem } // spread operator, spreads an object into separate arguments

        // evaluate whatever is in the [], accesses .taskObj dynamically
        newTask[event.target.name] = taskItem.complete ? false : true; // what is in the form, named exactly like it is in state
        setTaskItem(newTask) //  causes re-render
        editTask(newTask) //saves status to database
        .then(getTasksByCosplay(newTask.cosplayId))
    }

    //defines and returns html for an individual task
    return(
        <section className="taskObj">
            <dialog className="logout--dialog" ref={existDialog}>
                <div>Are you sure you want to delete?</div>
                <button className="logout--yes" onClick={() => {
                    deleteTask(taskObj)
                }}>Delete</button>
                <button className="logout--no" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>
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
            <label htmlFor={`taskObj`} className="taskObj">{`${taskObj.name}`}</label>
            <div className="taskActions">
                <button 
                    type="button" 
                    className="taskBtn-delete delete" 
                    id={`deleteTask--${taskObj.id}`} 
                    onClick={
                        () => {
                            existDialog.current.showModal()
                }}>🗑️</button>
                <button 
                    type="button" 
                    className="taskBtn-edit edit" 
                    id={`editTask--${taskObj.id}`}
                    onClick={
                        () => {
                            history.push(`/cosplays/tasks/edit/${taskObj.id}`)
                }}>✏️</button>   
            </div>   
        </section>
    )
}