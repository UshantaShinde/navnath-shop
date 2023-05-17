import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./auth.css"
import { Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';


const Login = () => {
    const auth = getAuth();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("")
    const navigate = useNavigate();

    const login = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Logged Successfuly");
                alert("LogIn Successfully");
                localStorage.setItem("user",user.uid);
                localStorage.setItem("useremail",user.email);
                console.log(user);
                getUser(user.uid);
                navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Error")
                alert("Error")
            });
    }
    const getUser = async (id) => {
        const docRef = doc(db, "users", id);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
            localStorage.setItem("userdetails",docSnap.data().name);
        } else {
          console.log("No such document!");
        }
      }



    return (
        <div className='form'>
            <h1>Login </h1>
            <input type="text" placeholder='Email' onChange={(e) => setemail(e.target.value)} />
            <input type="password" placeholder='Password' onChange={(e) => setpassword(e.target.value)} />
            <button onClick={login}>Login</button><span>New Here <Link to={"/signup"}>Create Account</Link></span>
        </div>
    )
}

export default Login