import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { db } from '../firebase.config';
import { useState } from 'react';
import profilepic from "../assets/profile.jpg"

const ViewUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "users"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), id: doc.id });
            });
            setUsers(products);
        })
        window.scrollTo(0, 0);
        return () => { unsub(); }
    }, [])

    return (
        <div>
            <h1 style={{textAlign:"center"}}>Customers</h1>
            <div className="users-container">
                {
                    users.map((e) => {
                        return (<div className="users-card">
                            <img src={profilepic} alt="" />
                            <h1>{e.name}</h1>
                            <h5>ID : {e.id}</h5>
                            <h3>{e.email}</h3>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default ViewUsers