import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"




export const ProductForm = () => {
  /*
      TODO: Add the correct default properties to the
      initial state object
  */
  const [product, update] = useState({
    name: "",
    type: "",
    price: "",
  })

  const [productTypes, setProductTypes] = useState([])
  /*
      TODO: Use the useNavigation() hook so you can redirect
      the user to the ticket list
      
  */
  const navigate = useNavigate()

  // const localKandyUser = localStorage.getItem("kandy_user")
  // const kandyUserObject = JSON.parse(localKandyUser)

  const handleSaveButtonClick = (event) => {
    event.preventDefault()



    // TODO: Create the object to be saved to the API
    const productToSendToAPI = {
      name: product.name,
      productTypeId: +product.type,
      pricePerUnit: +product.price,
    }

    // TODO: Perform the fetch() to POST the object to the API
    return fetch(`http://localhost:8088/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(productToSendToAPI)
    })
      .then(response => response.json())
      .then(() => {
        navigate("/products")

      })
  }

  useEffect(
    () => {
      fetch(`http://localhost:8088/productTypes`)
        .then(response => response.json())
        .then((productsArray) => {
          setProductTypes(productsArray)
        })
      console.log("Inital state of products") //view the Initial state of locations
    },
    [] //When this array is empty, you are observing inital componenet state
  );


  return (
    <form className="productForm">
      <h2 className="productForm__title">New Product</h2>
      <fieldset>
        <div className="form-group">
          <label>Name:</label>
          <input
            required autoFocus
            type="text"
            className="form-control"
            placeholder="Product Name"
            value={product.name}
            onChange={
              (evt) => {
                const copy = { ...product }
                copy.name = evt.target.value
                update(copy)
              }
            } />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Type:</label>
          <select
            required autoFocus
            className="form-control"
            placeholder="Product Type"
            value={product.type}
            onChange={
              (evt) => {
                const copy = { ...product }
                copy.type = evt.target.value
                update(copy)
              }
            }
          >
            {productTypes.map(item => (
              <option value={item.id} key={item.id}>{item.type}</option>
            ))}
          </select>
          {/* <input
          required autoFocus
          type="text"
          className="form-control"
          placeholder="Product Type"
          value={product.type}
          onChange={
            (evt) => {
              const copy = { ...product }
              copy.type = evt.target.value
              update(copy)
            }
          } /> */}
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Price:</label>
          <input
            required autoFocus
            type="text"
            className="form-control"
            placeholder="Product Price"
            value={product.price}
            onChange={
              (evt) => {
                const copy = { ...product }
                copy.price = evt.target.value
                update(copy)
              }
            } />
        </div>
      </fieldset>
      <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary">
        Submit Product
      </button>
    </form>
  )
}