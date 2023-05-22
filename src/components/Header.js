import { collection, query, where, getDocs } from "firebase/firestore";
import React, { useContext, useEffect } from 'react'
import "./header.css"
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assets/logo.jpeg"
import cartimg from "../assets/shopping-cart-icon.jpg"
import cartContext from '../context/CartContext'
import { db } from "../firebase.config";

const Header = () => {
    const auth = localStorage.getItem('user');
    const user = localStorage.getItem("userdetails");
    const navigate = useNavigate();
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartc = useContext(cartContext);

    useEffect(() => {
        cartc.update();
    }, [cartc.cart.length])

    const logout = () => {
        localStorage.clear();
        alert("LogOut Successfully")
    }
    const findProduct = async (data) => {

        const q = query(collection(db, "products"), where("name", "==", data));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    }



    return (
        <div className="nav-comp">
            <nav>
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to={"/admin"}><h1>NavNath-Traders</h1></Link>
                </div>
                <div className="inputbox">
                    <input type="text" placeholder='Find your product' onChange={(e) => { findProduct(e.target.value) }} />
                    <i class="fa fa-search" ></i>
                </div>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/#products">Products</a></li>
                    {/* <li><a href="/">Services</a></li> */}
                    <li><Link to={"/about"} >About</Link></li>
                    <li><Link to={"/contact"}>Contact</Link></li>
                    {
                        auth ? <li>
                            <div class="dropdown">
                                <a class="dropbtn"><b> {user}</b></a>
                                <div class="dropdown-content">
                                    <Link to={"/profile"} >My Profile</Link>
                                    <Link to={"/orders"} >Orders</Link>
                                    <a style={{backgroundColor:"gray",color:"white"}} href="" onClick={logout}>LogOut</a>
                                </div>
                            </div>

                        </li> : <>
                            <li><Link to={"/login"}>Log In</Link></li>
                        </>
                    }
                    <li></li>
                    <li><Link to={"/cart"} className="cart">
                        <img src={cartimg} style={{ width: "30px" }} alt="" />
                        {cartc ?
                            <span className='cart-item'>{cartc.cart.length}</span>
                            :
                            ""
                        }</Link></li>
                </ul>

            </nav>
            <div className="empty"></div>
        </div>
    )
}

export default Header