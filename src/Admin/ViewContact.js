import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config';

const ViewContact = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "contact"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), id: doc.id });
            });
            setContacts(products);
        })
        return () => { unsub(); }
    }, [])
  return (
    <div>
        {
            contacts.map((e) => {
                return(<div className='contact-details'>
                <h1><b>Name : </b>{e.name} {e.lastName}</h1>
                <h4>Messgae : {e.message}</h4>
                <h5>State : {e.state}</h5>
                <h5>City : {e.city}</h5>
                <h5>Area : {e.area}</h5>
                <h5>Phone : {e.phone}</h5>
                <h5>Email : {e.email}</h5>
                </div>)
            })
        }
    </div>
  )
}

export default ViewContact