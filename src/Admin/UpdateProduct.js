import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config';
import { Navigate, useParams } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [desc, setdesc] = useState("")
    const [img, setImg] = useState(null);
    const [price, setPrice] = useState(0);

    const { id } = useParams();
    // const [brand, setBrand] = useState("");
    // const [brandlist, setbrandlist] = useState([]);


    const getProduct = async () => {
        const UserRef = collection(db, "products");
        const docRef = doc(UserRef, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setImg(docSnap.data().img);
            setName(docSnap.data().name);
            setdesc(docSnap.data().desc);
            setPrice(docSnap.data().price);
        } else {
            console.log("No such document!");
        }
    }

    const updateData = async () => {
        const OrderRef = doc(db, 'products', id);
        await setDoc(OrderRef, {
            name: name,
            desc: desc,
            img: img,
            price: +price
        }, { merge: true });
        alert("Status Upadated");
    }

    useEffect(() => {
      getProduct();
    }, [])
    

    return (
        <div className='product-from'>
            <h1>Update Product</h1>
            <h5>name</h5>
            <input type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
            <h5>description</h5>
            <input type="text" value={desc} onChange={(e) => { setdesc(e.target.value) }} />
            <h5>Price</h5>
            <input type="number" value={price} onChange={(e) => { setPrice(e.target.value) }} />
           {/* <h5>brand</h5>
             <select name="brand" onChange={(e) => setBrand(e.target.value)}>
                <option value="">Choose Brand</option>
                {
                    brandlist.map((e, i) => {
                        return (<>
                            <option key={i} value={e.id}>{e.name}</option>
                        </>)
                    })
                }
            </select> */}
            <h5>Image</h5>
            <img style={{width:"300px",border:"1px solid gray"}} src={img} alt="" /><br/>
            <input type="text" value={img} onChange={(e) => { setImg(e.target.value) }} /><br />
            <button onClick={updateData}>Submit</button>
        </div>
    )
}

export default UpdateProduct