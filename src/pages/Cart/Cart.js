import { doc, deleteDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from 'react'
import "./cart.css"
import { Link, useNavigate } from 'react-router-dom';
import cartContext from '../../context/CartContext';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../firebase.config';

const Cart = () => {
    let [products, setProducts] = useState([]);
    const cartc = useContext(cartContext);
    const navigate = useNavigate();
    const userID = localStorage.getItem('user');

    useEffect(() => {
        if (!userID) {
            navigate('/login');
        }
        const q = query(collection(db, "cart", userID, "cart_item"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), id: doc.id });
            });
            setProducts(products);
        })

        return () => { unsub(); }
    }, [])

    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total += products[i].price;
    }

    const removeitem = async (v) => {
        await deleteDoc(doc(db, "cart", userID, "cart_item", v.id));
        cartc.update();
    }

    console.log(products)
    return (<>{
        (total <= 0) ? <h1>Empty</h1> : <>
            <div className='cart-list'>
                {
                    products.map((v) => {
                        return (<><div className='cart-item'>
                            <img src={v.img} alt="" style={{ width: "200px" }} />
                            <div className="flexbox">
                                <Link to={"/productpage/" + v.productid}><h1>{v.name}</h1></Link>
                                <p>Rs. {v.price}</p>
                                <button onClick={(e) => removeitem(v)}>Remove</button></div>
                        </div>
                            <div className="line"></div></>
                        )
                    })
                }
                <div className="total">
                    <h1>Total : Rs. {total}</h1>
                    <button><Link to={"/addaddress"}>Buy</Link></button></div>
            </div></>
    }
    </>
    )
}

export default Cart