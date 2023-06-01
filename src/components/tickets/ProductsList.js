import { useEffect, useState } from "react"
import "./Product.css"



export const ProductsList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

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
    );

    useEffect(
        () => {
            if (kandyUserObject.staff) {
                //for employees
                setFiltered(products)
            }
        },
        [products]
    );

    useEffect(() => {
        const sortedProducts = products.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        setFiltered(sortedProducts);
    },
        [products]
    );

    return <>

        <h2>Products:</h2>

        <article className="products">
            {
                filteredProducts.map(
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