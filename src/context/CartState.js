import { useState } from "react";
import cartContext from "./CartContext";
import { collection, deleteDoc, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase.config";
import { getDocs } from "firebase/firestore";

const Cartstate = (props) => {
    const [cart, setCart] = useState([]);
    const userID = localStorage.getItem('user');


    const update = async () => {

        const querySnapshot = await getDocs(collection(db, "cart", userID, "cart_item"));
        let products = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            products.push({ ...doc.data(), id: doc.id });
        });
        setCart(products);
    }
    const EmptyCart = async () => {
        cart.forEach(async (v) => {
            await deleteDoc(doc(db, "cart", userID, "cart_item", v.id));
            console.log(v.id);
        })
        console.log("Emptying cart");
    }

    return (
        <cartContext.Provider value={{ cart, update, EmptyCart }}>
            {props.children}
        </cartContext.Provider>
    )
}

export default Cartstate;
