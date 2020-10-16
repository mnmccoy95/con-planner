import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { CosplayProvider } from "./cosplay/CosplayProvider"
import { CosplayList } from "./cosplay/CosplayList"
import { CosplayForm } from "./cosplay/CosplayForm"
import { CosplayDetail } from "./cosplay/CosplayDetail"
import { ItemProvider } from "./item/ItemProvider"
import { ItemList } from "./item/ItemList"
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
import { EEList } from "./eventEssential/EEList"

export const ApplicationViews = (props) => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

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

                <ItemProvider>

                    <Route exact path="/cosplays/detail/:id">
                        <CosplayDetail />
                        <ItemList />
                    </Route>

                    <Route exact path="/cosplays/items/create/:cosplayId(\d+)">
                        <ItemForm />
                    </Route>

                    <Route exact path="/cosplays/items/edit/:itemId(\d+)">
                        <ItemEdit />
                    </Route>

                </ItemProvider>

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
                                <Route exact path="/events/detail/:id">
                                    <EventDetail />
                                    <ECList />
                                    <EEList />
                                </Route>
                            </EEProvider>
                        </ECProvider>
                    </CosplayProvider>
                </EssentialProvider>

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