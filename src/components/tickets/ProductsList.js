import { useEffect, useState } from "react"
import "./Product.css"
import { useNavigate } from "react-router-dom"




export const ProductsList = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFiltered] = useState([])
  const [pricey, setPriceyProduct] = useState([])
  const navigate = useNavigate()

  const localKandyUser = localStorage.getItem("kandy_user")
  const kandyUserObject = JSON.parse(localKandyUser)

  useEffect(
    () => {
      fetch(`http://localhost:8088/products?_expand=productType`)
        .then(response => response.json())
        .then((productsArray) => {
          setProducts(productsArray)
        })
      console.log("Inital state of products") //view the Initial state of locations
    },
    [] //When this array is empty, you are observing inital componenet state
  );



  useEffect(() => {
    {
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
      setFiltered(products)
    }
  },
    [products]
  );

  useEffect(
    () => {
      if (pricey) {
        const priceyProducts = products.filter(product => product.pricePerUnit >= 2)
        setFiltered(priceyProducts)
      }
      else {
        setFiltered(products)
      }
    },
    [pricey]
  )

  return <>

    {
      kandyUserObject.staff
        ? <>
          <button onClick={() => setPriceyProduct(true)}>Top Priced</button>
          <button onClick={() => setPriceyProduct(false)}>All Products</button>
          <button onClick={() => navigate("/ticket/create")}>Create Product</button>

        </>
        : <>

        </>
    }

    <h2>Products:</h2>

    <article className="products">
      {
        filteredProducts.map(
          (product) => {
            return <section className="product" key={`product--${product.id}`}>
              <header> <b>{product.name}</b></header>
              <footer><u>price:</u> {product.pricePerUnit.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
              })}
              </footer>
              <footer><u>type:</u> {product.productType.type}
              </footer>
            </section >
          }
        )
      }
    </article >
  </>
}