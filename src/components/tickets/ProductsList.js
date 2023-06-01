import { useEffect, useState } from "react"
import "./Product.css"
import { useNavigate } from "react-router-dom"


export const ProductsList = () => {
    const [products, setProducts] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/products`)
                .then(response => response.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                })
            console.log("Inital state of products") //view the Initial state of locations
        },
        [] //When this array is empty, you are observing inital componenet state
    )

    return <>

        <h2>Products:</h2>

        <article className="products">
            {
                products.map(
                    (product) => {
                        return <section className="product" key={`product--${product.id}`}>
                            <header> {product.name}</header>
                            <footer>price: {product.pricePerUnit.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD"
                            })}
                            </footer>
                        </section >
                    }
                )
            }
        </article >
    </>
}