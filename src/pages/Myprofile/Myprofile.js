import React, { useEffect } from 'react'
import { collection, onSnapshot, query, doc, getDoc, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { useState } from 'react';
import "./myprofile.css"
import { useNavigate } from 'react-router-dom';
import profilePic from "../../assets/profile.jpg"

const Myprofile = () => {
  const user = localStorage.getItem("user");
  const [userDetails, setUserDetails] = useState("");
  const [address, setaddress] = useState([]);
  const navigate = useNavigate();

  const getUser = async () => {
    const docRef = doc(db, "users", user);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserDetails(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  const getUserAddress = async () => {
    const addressRef = collection(db, "users", user, "adresss");
    const data = await getDocs(addressRef);
    console.log(data);
    setaddress(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    console.log(address);
  }

  useEffect(() => {
    getUser();
    getUserAddress();
  }, [])

  return (
    <div className='profile'>
      <div className="container">
        <div className="row">
          <span>Name</span>
          <h1>{userDetails.name}</h1>
          <span>Email</span>
          <h2>{userDetails.email}</h2>
          <span>Address</span>
          {
            address.map((e) => {
              return (<div>
                <div className="row">
                  <h3>{e.houseno}</h3>
                  <h3>{e.Area},{e.Landmark}</h3>
                  <h3>{e.pincode},{e.city}</h3>
                  <h3>{e.state}</h3>
                </div>

              </div>)
            })
          }
          <button onClick={() => { navigate("/adddetails") }} >Edit</button>
        </div>
        <div className="row">
          <img src={profilePic} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Myprofile