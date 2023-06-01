import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar_link" to="/locations">Locations</Link>
            </li>
            {
                localStorage.getItem("kandy_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar_link" to="" onClick={() => {
                            localStorage.removeItem("kandy_user")
                            navigate("/", { replace: true })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}





// export const NavBar = () => {
//     const navigate = useNavigate()

//     return (
//         <ul className="navbar">
//             <li className="navbar__item navbar__logout">
//                 <Link className="navbar__link" to="" onClick={() => {
//                     localStorage.removeItem("kandy_user")
//                     navigate("/", {replace: true})
//                 }}>Logout</Link>
//             </li>
//         </ul>
//     )
// }

