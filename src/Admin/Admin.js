import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import "./admin.css"
import { db } from '../firebase.config';
import logo from "../assets/logo.jpeg"

const Admin = () => {
  const [user, setUser] = useState([]);
  const [auth, setAuth] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    const q = query(collection(db, "admin"), where("email", "==", email), where("password", "==", password));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUser(doc.data());
      if (doc.id) {
        setAuth(1);
      } else if (!doc.data()) {
        alert("Invalid Data")
      }
    });
  }

  return (<>
    <div className='admin'>
      {(auth === 1) ? <>
        <div className="menu">
          <h2>Navnath Traders</h2>
          <h2><NavLink to={"report"}>Dashboard</NavLink></h2>
          <div className="line"></div>
          <li><NavLink to={"addproduct"}>Add Product</NavLink></li>
          <li><NavLink to={"viewproducts"}>Product</NavLink></li>
          <li><NavLink to={"viewcontact"}>Contacts</NavLink></li>
          <li><NavLink to={"ordersReport"}>ordersReport</NavLink></li>
          <li><NavLink to={"viewusers"}>Customer</NavLink></li>
        </div>
        <div className="menu-space"></div>
        <div className="admin-container">
          <Outlet />
        </div>
      </> : <>
          <div class="login-form">
          <img src={logo} alt="" />
        <div className='login'>
            <h1>Admin</h1>
            <h5>Email</h5>
            <input type="text" placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value) }} />
            <h5>Password</h5>
            <input type="password" placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value) }} />
            <br />
            <button onClick={login}>Submit</button>
          </div>
        </div>
      </>}
    </div>
  </>
  )
}

export default Admin