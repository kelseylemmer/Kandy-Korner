import { useEffect, useState } from "react"
import "./Location.css"
import { useNavigate } from "react-router-dom"


export const LocationsList = () => {
    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
            console.log("Inital state of locations") //view the Initial state of locations
        },
        [] //When this array is empty, you are observing inital componenet state
    )

    return <>

        <h2>Locations:</h2>

        <article className="locations">
            {
                locations.map(
                    (location) => {
                        return <section className="location" key={`location--${location.id}`}>
                            <header> {location.address}</header>
                            <footer>Square footage: {location.squareFootage}</footer>
                        </section >
                    }
                )
            }
        </article >
    </>
}