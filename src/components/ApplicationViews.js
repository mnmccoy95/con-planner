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

export const ApplicationViews = (props) => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>


            <CosplayProvider>
                <Route exact path="/cosplays">
                    <CosplayList />
                </Route>
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
                </ItemProvider>
                <Route path="/cosplays/edit/:cosplayId(\d+)">
                    <CosplayForm />
                </Route>
            </CosplayProvider>

        </>
    )
}