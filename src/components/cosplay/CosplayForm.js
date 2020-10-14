//add form and save for cosplay completion status


import React, { useContext, useState, useEffect } from "react"
import { CosplayContext } from "./CosplayProvider"
import { useHistory, useParams } from 'react-router-dom';

export const CosplayForm = (props) => {
    const { addCosplay, getCosplayById, updateCosplay } = useContext(CosplayContext)
    const userId = parseInt(localStorage.getItem("cosplayerId"))

    //for edit, hold on to state of animal in this view
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
        //animal is an object with properties. 
        //set the property to the new value
        newCosplay[event.target.name] = event.target.value
        //update state
        setCosplay(newCosplay)
    }
    
    // Get customers and locations. If animalId is in the URL, getAnimalById
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
    

    const constructCosplayObject = () => {
            //disable the button - no extra clicks
            setIsLoading(true);
            if (cosplayId){
                //PUT - update
                //ref pic could go here
                updateCosplay({
                    id: cosplay.id,
                    userId: userId,
                    character: cosplay.character,
                    series: cosplay.series,
                })
                .then(() => history.push(`/cosplays/detail/${cosplay.id}`))
            }else {
                //POST - add
                //ref pic could go here
                addCosplay({
                    userId: userId,
                    character: cosplay.character,
                    series: cosplay.series,
                })
                .then(() => history.push("/cosplays"))
            }
        }
    
    return (
        <form className="cosplayForm">
            <h2 className="cosplayForm__title">{cosplayId ? <>Save Event</> : <>Add Event</>}</h2>
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
                    <input type="text" id="cosplaySeries" name="series" required autoFocus className="form-control" 
                    placeholder="Series name" 
                    onChange={handleControlledInputChange} 
                    defaultValue={cosplay.series}/>
                </div>
            </fieldset>
            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form
                    constructCosplayObject()
                }}>
            {cosplayId ? <>Save Cosplay</> : <>Add Cosplay</>}</button>
        </form>
    )
}