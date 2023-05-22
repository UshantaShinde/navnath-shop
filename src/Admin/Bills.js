import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config';

const Bills = () => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "payments"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), id: doc.id });
            });
            setPayments(products);
        })
        window.scrollTo(0, 0);
        return () => { unsub(); }
    }, [])

    return (
        <div>
            <h1>Bills</h1>
            <div className="bills-container">
                {
                    payments.map((e) => {
                        return (<div className="bill-card">
                            <h2>{e.customer_name}</h2>
                            <h5>Id : {e.customer_id}</h5>
                            <h4>Total Items : {e.quantity}</h4>
                            <h4>Total  : {e.total}</h4>
                            <h4>Payment Type : {e.mode}</h4>
                            <h4>Date : {e.date}</h4>
                            <br/>
                            <br/>
                            <br/>
                            <h5>Payment Id : {e.id}</h5>
                        </div>

                        )
                    })
                }
            </div>

        </div>
    )
}

export default Bills