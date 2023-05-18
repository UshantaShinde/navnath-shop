import { addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [desc, setdesc] = useState("")
    const [img, setImg] = useState(null);
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState("");
    const [brandlist, setbrandlist] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "category"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), id: doc.id });
            });
            setbrandlist(products);
        })
        return () => { unsub(); }
    }, [])


    const addData = async () => {
        const docRef = await addDoc(collection(db, "products"), {
            name: name,
            price: +price,
            desc: desc,
            cat_id: brand,
            img: img
        });
        alert("Document written with ID: "+ docRef.id)
    }

    return (
        <div className='product-from'>
            <h1>Add Product</h1>
            <h5>name</h5>
            <input type="text" onChange={(e) => { setName(e.target.value) }} />
            <h5>description</h5>
            <input type="text" onChange={(e) => { setdesc(e.target.value) }} />
            <h5>Price</h5>
            <input type="number" onChange={(e) => { setPrice(e.target.value) }} />
            <h5>brand</h5>
            <select name="brand" onChange={(e) => setBrand(e.target.value)}>
                <option value="">Choose Brand</option>
                {
                    brandlist.map((e, i) => {
                        return (<>
                            <option key={i} value={e.id}>{e.name}</option>
                        </>)
                    })
                }
            </select>
            <h5>img</h5>
            <input type="text" onChange={(e) => { setImg(e.target.value) }} />
            <button onClick={addData}>Submit</button>
        </div>
    )
}

export default AddProduct