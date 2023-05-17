import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase.config';
import "./brands.css"
import { Link, useParams } from 'react-router-dom';

const Brand = () => {
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    const [brand, setbrand] = useState("");

    const getBrand = async () => {
        const docRef = doc(db, "category", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setbrand(docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }


    useEffect(() => {
        const q = query(collection(db, "products"), where("cat_id", "==", id));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), id: doc.id });
            });
            setProducts(products);
        })
        getBrand();
        window.scrollTo(0, 0);
        return () => { unsub(); }
    }, [])

    return (
        <>
            <div className="brand-name">
                <h1>{brand.name}</h1>
                <img src={brand.img} alt="" />
            </div>
            <div className="items">
                {
                    products.map((e) => {
                        return (<>
                            <div class="wrapper">
                                <div class="container">
                                    <div class="top" style={{ backgroundImage: `url(${e.img})` }}></div>
                                    <div class="bottom">
                                        <div class="left">
                                            <div class="details">
                                                <Link to={"/productpage/" + e.id} > <h1>{e.name}</h1> </Link>
                                            </div>
                                        </div>
                                        <div class="right">
                                            <div class="done"><i class="material-icons">done</i></div>
                                            <div class="details">
                                                <h1>Chair</h1>
                                                <p>Added to your cart</p>
                                            </div>
                                            <div class="remove"><i class="material-icons">clear</i></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="inside">
                                    <div class="icon">info</div>
                                    <div class="contents">
                                        <p>{e.desc}</p>
                                    </div>
                                </div>
                            </div>
                        </>)
                    })
                }
            </div>
        </>

    )
}

export default Brand