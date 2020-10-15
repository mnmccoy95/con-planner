import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { useHistory, useParams } from 'react-router-dom';

export const EventForm = (props) => {
    const { getEvents, addEvent, getEventById, updateEvent } = useContext(EventContext)
    const userId = parseInt(localStorage.getItem("cosplayerId"))


    //for edit, hold on to state of event in this view
    const [event, setEvent] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {eventId} = useParams();
    const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (evt) => {
        //When changing a state object or array, 
        //always create a copy make changes, and then set state.
        const newEvent = { ...event }
        //event is an object with properties. 
        //set the property to the new value
        newEvent[evt.target.name] = evt.target.value

        //update state
        setEvent(newEvent)
    }

    const setBadgeStatus = (evt) => {
        const newEvent = { ...event } // spread operator, spreads an object into separate arguments

        // evaluate whatever is in the [], accesses .task dynamically
        newEvent[evt.target.name] = event.badgeStatus ? false : true; // what is in the form, named exactly like it is in state
        //update state with each keystroke
        setEvent(newEvent) //  causes re-render
    }
    
    //*** This code is copyright 2002-2016 by Gavin Kistner, !@phrogz.net
    //*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
    Date.prototype.customFormat = function(formatString){
        var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
        YY = ((YYYY=this.getFullYear())+"").slice(-2);
        MM = (M=this.getMonth()+1)<10?('0'+M):M;
        MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
        DD = (D=this.getDate())<10?('0'+D):D;
        DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
        th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
        formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
        h=(hhh=this.getHours());
        if (h==0) h=24;
        if (h>12) h-=12;
        hh = h<10?('0'+h):h;
        hhhh = hhh<10?('0'+hhh):hhh;
        AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
        mm=(m=this.getMinutes())<10?('0'+m):m;
        ss=(s=this.getSeconds())<10?('0'+s):s;
        return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
    };
    
    // If eventId is in the URL, getEventById
    useEffect(() => {
        getEvents()
        .then(() => {
            if (eventId){
                getEventById(eventId)
                .then(event => {
                    event.startDate = new Date(event.startDate).customFormat( "#YYYY#-#MM#-#DD#")
                    event.endDate = new Date(event.endDate).customFormat( "#YYYY#-#MM#-#DD#")
                    setEvent(event)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })
    }, [])

    const constructEventObject = () => {
            //disable the button - no extra clicks
            setIsLoading(true);
            //javascript saves dates weird so I add a few hours to adjust time zone for proper displaying
            let start = Date.parse(event.startDate)+21600000
            let end = Date.parse(event.endDate)+21600000
            if (eventId){
                //PUT - update
                updateEvent({
                    id: event.id,
                    name: event.name,
                    userId: userId,
                    eventAddress: event.eventAddress,
                    eventCity: event.eventCity,
                    eventState: event.eventState,
                    eventZip: event.eventZip,
                    startDate: start,
                    endDate: end,
                    badgeStatus: event.badgeStatus,
                    badgePrice: event.badgePrice
                })
                .then(() => history.push(`/events/detail/${event.id}`))
            }else {
                //POST - add
                addEvent({
                    name: event.name,
                    userId: userId,
                    eventAddress: event.eventAddress,
                    eventCity: event.eventCity,
                    eventState: event.eventState,
                    eventZip: event.eventZip,
                    startDate: start,
                    endDate: end,
                    badgeStatus: event.badgeStatus,
                    badgePrice: event.badgePrice
                })
                .then(() => history.push("/events"))
            }
        }
    
    return (
        <form className="eventForm">
            <h2 className="eventForm__title">{eventId ? <>Save Event</> : <>Add Event</>}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventName">Event name: </label>
                    <input type="text" id="eventName" name="name" required autoFocus className="form-control" 
                    placeholder="Event name" 
                    onChange={handleControlledInputChange} 
                    defaultValue={event.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventAddress">Event Address: </label>
                    <input type="text" id="eventAddress" name="eventAddress" required className="form-control" 
                    placeholder="Event Address" 
                    onChange={handleControlledInputChange} 
                    defaultValue={event.eventAddress}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventCity">Event City: </label>
                    <input type="text" id="eventCity" name="eventCity" required className="form-control" 
                    placeholder="Event City" 
                    onChange={handleControlledInputChange} 
                    defaultValue={event.eventCity}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventState">Event State: </label>
                    <input type="text" id="eventState" name="eventState" required className="form-control" 
                    placeholder="Event State" 
                    onChange={handleControlledInputChange} 
                    defaultValue={event.eventState}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventZip">Event Zipcode: </label>
                    <input type="text" id="eventZip" name="eventZip" required className="form-control" 
                    placeholder="Event Zipcode" 
                    onChange={handleControlledInputChange} 
                    defaultValue={event.eventZip}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventStart">Event Start: </label>
                    <input type="date" id="eventStart" name="startDate" required className="form-control" 
                    placeholder="Event Start" 
                    onChange={handleControlledInputChange} 
                    defaultValue={event.startDate}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventEnd">Event End: </label>
                    <input type="date" id="eventEnd" name="endDate" required className="form-control" 
                    placeholder="Event End" 
                    onChange={handleControlledInputChange} 
                    defaultValue={event.endDate}/>
                </div>
            </fieldset>
            <fieldset>
                <label htmlFor="eventBadgeStatus">Badges Purchased: </label>
                <input 
                    type="checkbox" 
                    id={`check--complete`} 
                    name="badgeStatus" 
                    defaultValue={`${event.badgeStatus}`}
                    checked={event.badgeStatus}
                    onChange={(e) => {
                        // pressing the check box here will set the 
                        // task status from 'uncompleted' (false) to 
                        // 'completed' (true)
                        setBadgeStatus(e); // change task status
                    }}/>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventBadgePrice">Badge Price: </label>
                    <input type="text" id="eventBadgePrice" name="badgePrice" required className="form-control" 
                    placeholder="Badge Price" 
                    onChange={handleControlledInputChange} 
                    defaultValue={event.badgePrice}/>
                </div>
            </fieldset>

            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructEventObject()
                }}>
            {eventId ? <>Save Event</> : <>Add Event</>}</button>
        </form>
    )
}