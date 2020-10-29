import React, {useContext, useEffect} from "react"
import {EventContext} from "./event/EventProvider"
import {CosplayContext} from "./cosplay/CosplayProvider"
import "./Home.css"
import { HomeCard } from "./HomeCard"


export const Home = () => {
  //defines functions to be used
  const { getEvents } = useContext(EventContext)
  const { getCosplays } = useContext(CosplayContext)

	//gets all events and cosplays on initial render
  useEffect(() => {
    getEvents()
    getCosplays()
  }, [])

  return(
    <>
      < HomeCard />
    </>
  )
}