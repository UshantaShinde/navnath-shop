import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config';
import { collection, getCountFromServer, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import orderimg from "../assets/imgbin_computer-icons-purchase-order-purchasing-png.png"

const Report = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalorders, setTotalorders] = useState(0);
  const [totaldelevered, setTotaldelevered] = useState(0);
  const [payments, setPayments] = useState([]);
  const [total, setTotal] = useState(0);

  const getCustomersCount = async () => {
    const coll = collection(db, "users");
    const snapshot = await getCountFromServer(coll);
    console.log('count: ', snapshot.data().count);
    setTotalCustomers(snapshot.data().count);
  }


  const getProductsCount = async () => {
    const coll = collection(db, "products");
    const snapshot = await getCountFromServer(coll);
    console.log('count: ', snapshot.data().count);
    setTotalProducts(snapshot.data().count);
  }


  const getOrdesCount = async () => {
    const coll = collection(db, "orders");
    const snapshot = await getCountFromServer(coll);
    console.log('count: ', snapshot.data().count);
    setTotalorders(snapshot.data().count);
  }

  const getDeleveredorders = async () => {
    const coll = collection(db, "orders");
    const q = query(coll, where("status", "==", "Delevered"));
    const snapshot = await getCountFromServer(q);
    setTotaldelevered(snapshot.data().count)
  }


  function sumArray(array) {
    let sum = 0;
    array.forEach(item => {
      sum += item.total;
    });
    return sum;
  }

  useEffect(() => {
    getCustomersCount();
    getProductsCount();
    getOrdesCount();
    getDeleveredorders();
    const q = query(collection(db, "payments"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let products = [];
      querySnapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      setPayments(products);
      setTotal(sumArray(products));
    })

    return () => { unsub(); }
  }, [])



  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>
      <div className="dashboard-menu">
        <div className="d-card">
          <i class="fa fa-money"></i>
          <h3>Total Earning  : Rs. {total}</h3>
        </div>
        <div className="d-card">
          <i class="fa fa-users"></i>
          <h3>Customers : {totalCustomers}</h3>
        </div>
        <div className="d-card">
          <i class="fa fa-archive"></i>
          <h3>Products : {totalProducts}</h3>
        </div>
      </div>
      <div className="dashboard-menu">
        <div className="d-card">
          <i class="fa fa-truck"></i>
          <h3>Delevered  : {totaldelevered}</h3>
        </div>
        <div className="d-card">
          <i class="fa fa-shopping-cart"></i>
          <h3>Orders : {totalorders}</h3>
        </div>
      </div>
    </div>
  )
}

export default Report