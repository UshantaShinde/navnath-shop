import React, { useEffect, useState } from 'react'
import { db } from '../../firebase.config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import "./orders.css"

const Orders = () => {
    const user = localStorage.getItem("user");
    const [products, setProducts] = useState([]);


    useEffect(() => {
        const q = query(collection(db, "orders"), where("userid", "==", user));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), id: doc.id });
            });
            setProducts(products);
        })
        window.scrollTo(0, 0);
        return () => { unsub(); }
    }, [])


    return (
        <div className='orders'>
            {
                products.map((e) => {
                    return (<div className='container'>
                        <div className="row">
                            <img src={e.product_img} alt="" />
                        </div>
                        <div className="row">
                            <h1>{e.product_name}</h1>
                            <h2>{e.status}</h2>
                            <button>Cancel</button>
                        </div>
                    </div>)
                })
            }
        </div>
    )
}

export default Orders