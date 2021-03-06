import React, { useContext, useState, useEffect } from "react"
import { HotelContext } from "./HotelProvider"
import { useHistory, useParams } from 'react-router-dom';

export const HotelForm = (props) => {
    //defines functions to be used
    const { addHotel, getHotelByEventId, editHotel } = useContext(HotelContext)

    //for edit, hold on to state of hotel in this view
    const [hotel, setHotel] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    //defines relevant event Id
    const {eventId} = useParams();
    //used for navigating pages
    const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
        //When changing a state object or array, 
        //always create a copy make changes, and then set state.
        const newHotel = { ...hotel }
        //hotel is an object with properties. 
        //set the property to the new value
        newHotel[event.target.name] = event.target.value
        //update state
        setHotel(newHotel)
    }
    
    const setPurchaseStatus = (event) => {
        const newHotel = { ...hotel } // spread operator, spreads an object into separate arguments
        // evaluate whatever is in the [], accesses hotel dynamically
        newHotel[event.target.name] = hotel.purchased ? false : true; // what is in the form, named exactly like it is in state
        setHotel(newHotel) //  causes re-render
    }

    //checks if page is for edit or add and gets relevant info
    useEffect(() => {
        if (window.location.href.includes("edit")){
            if(eventId){
            getHotelByEventId(eventId)
                .then(hotel => {
                    setHotel(hotel[0])
                    setIsLoading(false)
                })}
        } else {
            setIsLoading(false)
        }

    }, [])
    
    //saves/updates hotel info entered by user
    const constructHotelObject = (event) => {
        event.preventDefault()
        //disable the button - no extra clicks
        setIsLoading(true);
        if (window.location.href.includes("edit")){
            //PUT - update
            editHotel({
                id: hotel.id,
                eventId: parseInt(eventId),
                name: hotel.name,
                address: hotel.address,
                city: hotel.city,
                state: hotel.state,
                zip: hotel.zip,
                purchased: hotel.purchased,
                price: parseFloat(hotel.price),
                people: parseInt(hotel.people)
            })
            .then(() => history.push(`/events/detail/${eventId}`))
        }else {
            //POST - add
            addHotel({
                eventId: parseInt(eventId),
                name: hotel.name,
                address: hotel.address,
                city: hotel.city,
                state: hotel.state,
                zip: hotel.zip,
                purchased: hotel.purchased,
                price: parseFloat(hotel.price),
                people: parseInt(hotel.people)
            })
            .then(() => history.push(`/events/detail/${eventId}`))
        }
    }
    
    //defines html for hotel form
    return (
        <form className="hotelForm margin" onSubmit={constructHotelObject}>
            <h2 className="hotelForm__title">Event Hotel Info</h2>
            <div className="formContainer">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hotelName">Hotel name: </label>
                    <input type="text" id="hotelName" name="name" required autoFocus className="form-control" 
                    placeholder="Hotel name" 
                    onChange={handleControlledInputChange} 
                    defaultValue={hotel?.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hotelAddress">Address: </label>
                    <input type="text" id="hotelAddress" name="address" required className="form-control" 
                    placeholder="Street Address" 
                    onChange={handleControlledInputChange} 
                    defaultValue={hotel?.address}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hotelCity">City: </label>
                    <input type="text" id="hotelCity" name="city" required className="form-control" 
                    placeholder="City" 
                    onChange={handleControlledInputChange} 
                    defaultValue={hotel?.city}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hotelState">State: </label>
                    <input type="text" id="hotelState" name="state" required className="form-control" 
                    placeholder="State" 
                    onChange={handleControlledInputChange} 
                    defaultValue={hotel?.state}/>
                </div>
            </fieldset>
            </div>
            <div className="formContainer">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hotelZip">Zip: </label>
                    <input type="text" id="hotelZip" name="zip" pattern="[0-9]{5}" required className="form-control" 
                    placeholder="Zipcode" 
                    onChange={handleControlledInputChange} 
                    defaultValue={hotel?.zip}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hotelPeople">Number of People in Room: </label>
                    <input type="text" id="hotelPeople" name="people" pattern="^[0-9]*$" className="form-control" 
                    placeholder="# People (for budgeting)" 
                    onChange={handleControlledInputChange} 
                    defaultValue={hotel?.people}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hotelPrice">Total Price: </label>
                    <input type="text" id="hotelPrice" name="price" pattern="^\d+(\.\d{2})?$" className="form-control" 
                    placeholder="Price of Stay" 
                    onChange={handleControlledInputChange} 
                    defaultValue={hotel?.price}/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="hotelPurchased">Purchased? </label>
                <input 
                    type="checkbox" 
                    id={`check--complete`} 
                    name="purchased" 
                    defaultValue={`${hotel?.purchased}`}
                    checked={hotel?.purchased}
                    onChange={(e) => {
                        // pressing the check box here will set the 
                        // hotel status from 'not purchased' (false) to 
                        // 'purchased' (true)
                        setPurchaseStatus(e); // change hotel purchase status
                    }}/>
            </fieldset>
            </div>
            <div className="hotelAddSave">
            <button className="btn btn-primary add"
                disabled={isLoading}
                >Save Hotel</button>
            </div>
        </form>
    )
}