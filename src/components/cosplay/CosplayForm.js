import React, { useContext, useState, useEffect } from "react"
import { CosplayContext } from "./CosplayProvider"
import { useHistory, useParams } from 'react-router-dom';

export const CosplayForm = (props) => {
    const { addCosplay, getCosplayById, editCosplay } = useContext(CosplayContext)
    const userId = parseInt(localStorage.getItem("cosplayerId"))

    //for edit, hold on to state of cosplay in this view
    const [cosplay, setCosplay] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {cosplayId} = useParams();
    const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
        //When changing a state object or array, 
        //always create a copy make changes, and then set state.
        const newCosplay = { ...cosplay }
        //cosplay is an object with properties. 
        //set the property to the new value
        newCosplay[event.target.name] = event.target.value
        //update state
        setCosplay(newCosplay)
    }
    
    const setCompletionStatus = (event) => {
        const newCosplay = { ...cosplay } // spread operator, spreads an object into separate arguments
        // evaluate whatever is in the [], accesses cosplay dynamically
        newCosplay[event.target.name] = cosplay.complete ? false : true; // what is in the form, named exactly like it is in state
        //update state with each keystroke
        setCosplay(newCosplay) //  causes re-render
    }

    //If cosplayId is in the URL, getCosplayById
    useEffect(() => {
        if (cosplayId){
            getCosplayById(cosplayId)
            .then(cosplay => {
                setCosplay(cosplay)
                setIsLoading(false)
                })
        } else {
            setIsLoading(false)
        }
    }, [])
    

    const constructCosplayObject = (evt) => {
        evt.preventDefault()
            //disable the button - no extra clicks
            setIsLoading(true);
            if (cosplayId){
                //PUT - update
                //ref pic could go here
                editCosplay({
                    id: cosplay.id,
                    userId: userId,
                    character: cosplay.character,
                    series: cosplay.series,
                    complete: cosplay.complete
                })
                .then(() => history.push(`/cosplays/detail/${cosplay.id}`))
            }else {
                //POST - add
                //ref pic could go here
                addCosplay({
                    userId: userId,
                    character: cosplay.character,
                    series: cosplay.series,
                    complete: cosplay.complete
                })
                .then(() => history.push("/cosplays"))
            }
        }
    
    return (
        <form className="cosplayForm" onSubmit={constructCosplayObject}>
            <h2 className="cosplayForm__title">{cosplayId ? <>Save Cosplay</> : <>Add New Cosplay</>}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="cosplayName">Character name: </label>
                    <input type="text" id="cosplayName" name="character" required autoFocus className="form-control" 
                    placeholder="Character name" 
                    onChange={handleControlledInputChange} 
                    defaultValue={cosplay.character}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="cosplaySeries">Series: </label>
                    <input type="text" id="cosplaySeries" name="series" className="form-control" 
                    placeholder="Series name" 
                    onChange={handleControlledInputChange} 
                    defaultValue={cosplay.series}/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="cosplayComplete">Complete? </label>
                <input 
                    type="checkbox" 
                    id={`check--complete`} 
                    name="complete" 
                    defaultValue={`${cosplay.complete}`}
                    checked={cosplay.complete}
                    onChange={(e) => {
                        // pressing the check box here will set the 
                        // cosplay status from 'uncompleted' (false) to 
                        // 'completed' (true)
                        setCompletionStatus(e); // change cosplay status
                    }}/>
            </fieldset>
            <button className="btn btn-primary"
                type="submit"
                disabled={isLoading}>
            {cosplayId ? <>Save Cosplay</> : <>Add Cosplay</>}</button>
        </form>
    )
}