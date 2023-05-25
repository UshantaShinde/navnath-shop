import React, { useContext, useEffect, useState } from 'react'
import "./productpage.css"
import { useNavigate, useParams } from "react-router-dom"
import { collection, onSnapshot, query, doc, getDoc, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import cartContext from '../../context/CartContext';

const ProductPage = () => {
  const [product, setProduct] = useState("");
  const { id } = useParams();
  const cartc = useContext(cartContext);
  const userID = localStorage.getItem('user');

  const getProduct = async () => {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setProduct(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  const addtocart = async () => {
    let prod = product;
    prod.productid = id;
    const docRef = await addDoc(collection(db, "cart", userID, "cart_item"), prod);
    alert("Added To Cart");
    cartc.update();
  }


  useEffect(() => {
    getProduct();
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="product-page">
      <div className="container">
        <div className="row">
          <img src={product.img} alt="" />
          <div className="circle"></div>
        </div>
        <div className="row">
          <h5>{product.brand}</h5>
          <h1>{product.name}</h1>
          <h3>₹ {product.price}/-</h3>
          <button onClick={addtocart}>Add To Cart</button>
          <p>{product.desc}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductPage