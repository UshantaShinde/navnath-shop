import { collection, onSnapshot, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config';

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
                <h5>Rs . {e.price}</h5><br/>
                <span><button>Update</button>
                  <button>Delete</button>
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