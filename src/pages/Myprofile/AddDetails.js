import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase.config';
import "./myprofile.css"

const AddDetails = () => {
  const user = localStorage.getItem("user");
  const [userDetails, setUserDetails] = useState("");
  const [address, setaddress] = useState([]);

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

  return (<div className="detaile-page">
    <div className="details-form">
      <h5>House No</h5>
      <input type="text" value={address[0].houseno}/><br/>
      <h5>Area</h5>
      <input type="text" value={address[0].Area}/><br/>
      <h5>City</h5>
      <input type="text" value={address[0].city}/><br/>
      <h5>State</h5>
      <input type="text" value={address[0].state}/><br/>
      <h5>Pin code</h5>
      <input type="text" value={address[0].pincode}/><br/>
      <button>Submit</button>
    </div>
    </div>

  )
}

export default AddDetails