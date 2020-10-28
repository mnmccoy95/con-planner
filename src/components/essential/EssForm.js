import React, { useContext, useState, useEffect } from "react"
import { EssentialContext } from "./EssProvider"
import { useHistory, useParams } from 'react-router-dom';

export const EssentialForm = (props) => {
    const { addEssential, getEssentialById, editEssential } = useContext(EssentialContext)
    const userId = parseInt(localStorage.getItem("cosplayerId"))

    //for edit, hold on to state of essential in this view
    const [essential, setEssential] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {essentialId} = useParams();
    const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
        //When changing a state object or array, 
        //always create a copy make changes, and then set state.
        const newEssential = { ...essential }
        //essential is an object with properties. 
        //set the property to the new value
        newEssential[event.target.name] = event.target.value
        //update state
        setEssential(newEssential)
    }

    //If essentialId is in the URL, getEssentialById
    useEffect(() => {
        if (essentialId){
            getEssentialById(essentialId)
            .then(essential => {
                setEssential(essential)
                setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])
    
    const constructEssentialObject = (evt) => {
        const savedContainer = document.querySelector(`#container-saved`)
        if(savedContainer){
            if(savedContainer.style.opacity == 0) {
                savedContainer.style.opacity = 1
                setTimeout(function(){
                    savedContainer.style.opacity = 0
                  },700);
            }
        }

        evt.preventDefault()
            //disable the button - no extra clicks
            setIsLoading(true);
            const clearer = document.querySelector("#essentialName")
            if(clearer.value !== "" && essential.name !== ""){
            if (essentialId){
                //PUT - update
                editEssential({
                    id: essential.id,
                    userId: userId,
                    name: essential.name
                })
                
                .then(() => history.push("/essentials"))
            }else {
                //POST - add
                addEssential({
                    userId: userId,
                    name: essential.name
                })
                .then(() => {
                    // Clear inputs after save
                    const clearer = document.querySelector("#essentialName")
                    clearer.value = ""
                    essential.name = ""
        
                    setIsLoading(false);
                })
            }}
            
    }
    
    return (
        <form className="essentialForm margin" onSubmit={constructEssentialObject}>
            <h2 className="essentialForm__title">{essentialId ? <>Edit Essential</> : <>Add New Essential</>}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="essentialName">Essential: </label>
                    <input type="text" id="essentialName" name="name" required autoFocus className="form-control" 
                    placeholder="Object Name" 
                    onChange={handleControlledInputChange} 
                    defaultValue={essential.name}/>
                </div>
            </fieldset>
            <div id="container-saved">Saved!</div>
            <button className="btn btn-primary add" disabled={isLoading} type="submit"> Save</button>
            <button className="btn btn-primary delete"
                onClick={event => {
                    history.push("/essentials")
                }}>
            Return</button>
            
        </form>
    )
}