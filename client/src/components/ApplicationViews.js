import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { CosplayProvider } from "./cosplay/CosplayProvider"
import { CosplayList } from "./cosplay/CosplayList"
import { CosplayForm } from "./cosplay/CosplayForm"
import { CosplayDetail } from "./cosplay/CosplayDetail"
import { ItemProvider } from "./item/ItemProvider"
import { ItemForm } from "./item/ItemForm"
import { ItemEdit } from "./item/ItemEdit"
import { EventProvider } from "./event/EventProvider"
import { EventList } from "./event/EventList"
import { EventForm } from "./event/EventForm"
import { EventDetail } from "./event/EventDetail"
import { EssentialProvider } from "./essential/EssProvider"
import { EssentialList } from "./essential/EssList"
import { EssentialForm } from "./essential/EssForm"
import { ECProvider } from "./eventCosplay/ECProvider"
import { ECList } from "./eventCosplay/ECList"
import { EEProvider } from "./eventEssential/EEProvider"
import { TaskProvider } from"./task/TaskProvider"
import { TaskForm } from "./task/TaskForm"
import { TaskEdit } from "./task/TaskEdit"
import { HotelProvider } from "./hotel/HotelProvider"
import { HotelForm } from "./hotel/HotelForm"
import { BudgetProvider } from "./budget/BudgetProvider"
import { BudgetForm } from "./budget/BudgetForm"

//defines all pages that can be navigated to
export const ApplicationViews = (props) => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            
            <EventProvider>
                <EssentialProvider>
                    <CosplayProvider>
                        <ECProvider>
                            <EEProvider>
                                <HotelProvider>
                                    <BudgetProvider>
                                        <Route exact path="/">
                                            <Home />
                                        </Route>
                                    </BudgetProvider>
                                </HotelProvider>
                            </EEProvider>
                        </ECProvider>
                    </CosplayProvider>
                </EssentialProvider>
            </EventProvider>

            <CosplayProvider>
                <EventProvider>
                    <ECProvider>
                        <Route exact path="/cosplays">
                            <CosplayList />
                        </Route>
                    </ECProvider>
                </EventProvider>

                <Route exact path="/cosplays/create">
                    <CosplayForm />
                </Route>
                
                <TaskProvider>
                    <ItemProvider>

                        <Route exact path="/cosplays/detail/:id">
                            <CosplayDetail />
                        </Route>

                        <Route exact path="/cosplays/items/create/:cosplayId(\d+)">
                            <ItemForm />
                        </Route>

                        <Route exact path="/cosplays/tasks/create/:cosplayId(\d+)">
                            <TaskForm />
                        </Route>

                        <Route exact path="/cosplays/items/edit/:itemId(\d+)">
                            <ItemEdit />
                        </Route>

                        <Route exact path="/cosplays/tasks/edit/:taskId(\d+)">
                            <TaskEdit />
                        </Route>

                    </ItemProvider>
                </TaskProvider>

                <Route path="/cosplays/edit/:cosplayId(\d+)">
                    <CosplayForm />
                </Route>

            </CosplayProvider>

            <EventProvider>

                <Route exact path="/events">
                    <EventList />
                </Route>

                <Route path="/events/edit/:eventId(\d+)">
                    <EventForm />
                </Route>

                <Route exact path="/events/create">
                    <EventForm />
                </Route>

                <EssentialProvider>
                    <CosplayProvider>
                        <ECProvider>
                            <EEProvider>
                                <HotelProvider>
                                    <BudgetProvider>
                                        <Route exact path="/events/detail/:id">
                                            <EventDetail />
                                            <ECList />
                                        </Route>
                                    </BudgetProvider>
                                </HotelProvider>
                            </EEProvider>
                        </ECProvider>
                    </CosplayProvider>
                </EssentialProvider>

                <HotelProvider>
                    <Route exact path="/events/hotel/edit/:eventId(\d+)">
                        <HotelForm />
                    </Route>
                    <Route exact path="/events/hotel/create/:eventId(\d+)">
                        <HotelForm />
                    </Route>
                </HotelProvider>

                <BudgetProvider>
                    <HotelProvider>
                        <Route exact path="/events/budget/edit/:eventId(\d+)">
                            <BudgetForm />
                        </Route>
                        <Route exact path="/events/budget/create/:eventId(\d+)">
                            <BudgetForm />
                        </Route>
                    </HotelProvider>
                </BudgetProvider>

            </EventProvider>

            <EssentialProvider>

                <EventProvider>
                    <EEProvider>
                        <Route exact path="/essentials">
                            <EssentialList />
                        </Route>
                    </EEProvider>
                </EventProvider>

                <Route path="/essentials/edit/:essentialId(\d+)">
                    <EssentialForm />
                </Route>

                <Route exact path="/essentials/create">
                    <EssentialForm />
                </Route>

            </EssentialProvider>
        </>
    )
}