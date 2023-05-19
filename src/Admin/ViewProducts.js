import { collection, deleteDoc, doc, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config';
import { Link } from 'react-router-dom';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "products"));
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

  const deleteProduct = async (id) => {
    if (window.confirm("Are You sure You want to delete product")) {
      await deleteDoc(doc(db, "products", id));
      alert("Products deleted");
    } else {
      // window.location.reload();
    }
  }

  return (
    <div className='list'>
      {
        products.map((e) => {
          return (<>
            <div class="container">
              <div class="row">
                <img src={e.img} alt="" />
              </div>
              <div class="row">
                <h3>{e.name}</h3>
                <p>{e.desc}</p>
                <h5>Rs . {e.price}</h5><br />
                <span><Link to={"/admin/updateproduct/" + e.id} ><button>Update</button></Link>
                  <button onClick={() => {deleteProduct(e.id)}}>Delete</button>
                </span>
              </div>
            </div>
          </>)
        })
      }
    </div>
  )
}

export default ViewProducts