import React from "react"

export const ECCard = ({ EC }) => {
    console.log(EC.items)
    const CosplayItems = () => {
        if(EC.items){
            return EC.items.map(item => {
                return( <div key={item.id}>{item.name}</div>)
            })
        } else {
            return (<>items don't exist</>)
        }
    }

    return (
    <section className="cosplayEvent">
        <h3 className="character__name">
            { EC.cosplay.character }
        </h3>
        <div>
        {CosplayItems()}
        </div>
        <button>Remove</button>
    </section>
    )
}