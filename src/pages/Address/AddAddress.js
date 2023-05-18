import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase.config';
import "./addaddress.css"
import { useNavigate } from 'react-router-dom';

const AddAddress = () => {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [phone, setPhone] = useState("");
  const [landmark, setLandmark] = useState("");
  const [houseno, setHouseno] = useState("");
  const [pincode, setPincode] = useState("");

  const user = localStorage.getItem("user");
  const navigate = useNavigate();

  const getUserAddress = async () => {
    const UserRef = collection(db, "users", user, "adresses");
    const docRef = doc(UserRef, "address");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setArea(docSnap.data().area);
      setCity(docSnap.data().city);
      setHouseno(docSnap.data().houseno);
      setLandmark(docSnap.data().landmark);
      setPhone(docSnap.data().phone);
      setPincode(docSnap.data().pincode);
      setState(docSnap.data().state);
    } else {
      console.log("No such document!");
    }
  }

  const addData = async () => {
    const UserRef = collection(db, "users", user, "adresses");
    await setDoc(doc(UserRef, "address"), {
      houseno: houseno,
      area: area,
      landmark: landmark,
      city: city,
      pincode: pincode,
      state: state,
      phone: phone,
    });
    navigate("/payment")
  }

  useEffect(() => {
    getUserAddress();
  }, [])


  return (
    <div className='address-form'>
      <h1>add address</h1>
      <span>House No</span>
      <input type="text" value={houseno} onChange={(e) => setHouseno(e.target.value)} />
      <span>Area</span>
      <input type="text" value={area} onChange={(e) => setArea(e.target.value)} />
      <span>Landmark</span>
      <input type="text" value={landmark} onChange={(e) => setLandmark(e.target.value)} />
      <span>city</span>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
      <span>pincode</span>
      <input type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} />
      <span>state</span>
      <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
      <span>phone no</span>
      <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button onClick={addData}>Submit</button>
    </div>
  )
}

export default AddAddress