import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./auth.css"
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

const Signup = () => {
    const auth = getAuth();
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const navigate = useNavigate();

    const signup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                alert("Account created succssfully")
                addUser(user.uid);
                navigate("/login");
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
                alert("Error");
            });
    }


    const addUser = async (id) => {
        const docRef = await addDoc(collection(db, "users"), {
            name: name,
            email: email
        });
        const UserRef = collection(db, "users");
        await setDoc(doc(UserRef, id),{
            name: name,
            email : email
        });
    }


    return (
        <div className='form'>
            <h1> Create New Account </h1>
            <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)}/>
            <input type="text" placeholder='Email' onChange={(e) => setemail(e.target.value)} />
            <input type="password" placeholder='Password' onChange={(e) => setpassword(e.target.value)} />
            <button onClick={signup}>Signup</button><span>Allready Have Account <Link to={"/login"}>Login</Link></span>
        </div>
    )
}

export default Signup