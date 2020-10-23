import React, {useContext, useEffect} from "react"
import {EventContext} from "./event/EventProvider"
import {CosplayContext} from "./cosplay/CosplayProvider"
import "./Home.css"
import { HomeCard } from "./HomeCard"


export const Home = () => {
    // This state changes when `getEvents()` is invoked below
    const { getEvents } = useContext(EventContext)
    const { getCosplays } = useContext(CosplayContext)

	//useEffect - reach out to the world for something
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