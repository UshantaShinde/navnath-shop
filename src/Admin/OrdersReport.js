import { collection, doc, onSnapshot, query, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config';

const OrdersReport = () => {
    const [orders, setorders] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const q = query(collection(db, "orders"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), id: doc.id });
            });
            setorders(products);
        })
        window.scrollTo(0, 0);
        return () => { unsub(); }
    }, [])

    const updateStatus = async (id) => {
        const OrderRef = doc(db, 'orders', id);
        await setDoc(OrderRef, { status: status }, { merge: true });
        alert("Status Upadated");
    }

    return (
        <div>
            <h1 style={{textAlign:"center"}}>
                OrdersReport
            </h1>
            <div className="order-container">
                {
                    orders.map((e) => {
                        return (<div className='orders-card'>
                            <h1>{e.product_name}</h1>
                            <h3>{e.username}</h3>
                            {/* <h5>{e.userid}</h5> */}
                            <h5>Payment No. {e.payment_id}</h5>
                            <select name="Status" onChange={(e) => setStatus(e.target.value)}>
                                <option value={e.status}>{e.status}</option>
                                <option value="Delevered">Delevered</option>
                                <option value="Dispatched">Dispatched</option>
                                <option value="Canceled">Canceled</option>
                                <option value="Pending">Pending</option>
                            </select>
                            <button onClick={() => updateStatus(e.id)}>Change Status</button>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default OrdersReport