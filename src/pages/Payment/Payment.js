import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import cartContext from '../../context/CartContext';
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';
import "./payment.css"

const Payment = () => {
  const [error, setError] = useState(null);
  const [cardNo, setCardNo] = useState(0);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [cvv, setCvv] = useState(0);
  const [holdername, setHoldername] = useState("");
  const cartc = useContext(cartContext);
  const user = localStorage.getItem("user");
  const username = localStorage.getItem("userdetails");
  const [address, setaddress] = useState("");

  const navigate = useNavigate();

  // Date object
  const date = new Date();
  let currentDay = String(date.getDate()).padStart(2, '0');
  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  let currentYear = date.getFullYear();
  let currentDate = `${currentDay}-${currentMonth}-${currentYear}`;



  let productlist = cartc.cart;
  let total = 0;
  for (let i = 0; i < productlist.length; i++) {
    total += productlist[i].price;
  }

  const getUserAddress = async () => {
    const UserRef = collection(db, "users", user, "adresses");
    const docRef = doc(UserRef, "address");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setaddress(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }



  const cheackCard = () => {
    if (cardNo.length === 16 && month !== 0 && year !== 0 && cvv.length === 3) {
      payBill();
    }
    else {
      alert("Please enter a valid card number.");
    }
  }

  const payBill = async () => {
    const docRef = await addDoc(collection(db, "payments"), {
      total: total,
      mode: "card",
      date: currentDate,
      quantity: +productlist.length,
      customer_id: user,
      customer_name: username,
    });
    alert("Document written with ID: " + docRef.id)
    // buyItems(data[0].id);
    buyItems(docRef.id)
  }

  const buyItems = (pay_id) => {
    if (pay_id !== 0) {
      for (let i = 0; i < productlist.length; i++) {
        addData(productlist[i].productid, productlist[i].name, productlist[i].img, pay_id);
      }
    } else {
      alert("Error");
    }
  }

  const addData = async (id, name, img, pay_id) => {
    const docRef = await addDoc(collection(db, "orders"), {
      userid: user,
      username: username,
      product_id: id,
      product_name: name,
      product_img: img,
      status: "pending",
      payment_id: pay_id
    })
    cartc.EmptyCart();
    navigate("/");
    window.location.reload();


  }

  useEffect(() => {
    getUserAddress();
  }, [])



  return (<div className="payment-page">
    <div className="address-container">
      <div className='address'>
        <h3>{address.houseno}</h3>
        <h3>{address.area} {address.landmark}</h3>
        <h3>{address.pincode} {address.city}</h3>
        <h3>{address.state}</h3>
      </div>
    </div>
    <div className='payment'>
      <main id="main">
        <section id="left">
          <div id="head">
            {/* <h1>Life has great moments</h1> */}
          </div>
        </section>
        <section id="right">
          <h3></h3>
          <h1>Purchase <span>Total: {total}</span></h1>
          <div className='frm'>
            <div id="form-card" class="form-field">
              <label for="cc-number">Card number:</label>
              <input id="cc-number" maxlength="16" placeholder="1111 2222 3333 4444" required onChange={(e) => setCardNo(e.target.value)} />
            </div>

            <div id="form-date" class="form-field">
              <label for="expiry-month">Expiry date:</label>
              <div id="date-val">
                <select id="expiry-month" required onChange={(e) => setMonth(e.target.value)} >
                  <option id="trans-label_month" value="" default="default" selected="selected">Month</option>
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                  <option value="8">08</option>
                  <option value="9">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
                <select id="expiry-year" required onChange={(e) => setYear(e.target.value)}>
                  <option id="trans-label_year" value="" default="" selected="selected">Year</option>
                  <option value="2018">18</option><option value="2019">19</option><option value="2020">20</option><option value="2021">21</option><option value="2022">22</option><option value="2023">23</option><option value="2024">24</option><option value="2025">25</option><option value="2026">26</option><option value="2027">27</option><option value="2028">28</option><option value="2029">29</option><option value="2030">30</option><option value="2031">31</option><option value="2032">32</option><option value="2033">33</option><option value="2034">34</option><option value="2035">35</option><option value="2036">36</option><option value="2037">37</option><option value="2038">38</option><option value="2039">39</option><option value="2040">40</option><option value="2041">41</option><option value="2042">42</option><option value="2043">43</option><option value="2044">44</option><option value="2045">45</option><option value="2046">46</option><option value="2047">47</option></select>
              </div>
            </div>

            <div id="form-sec-code" class="form-field">
              <label for="sec-code">Cvv code:</label>
              <input type="password" maxlength="3" placeholder="123" required onChange={(e) => setCvv(e.target.value)} />
            </div>

            <button onClick={cheackCard} type="submit">Buy </button>
          </div>
        </section>
      </main>
    </div></div>
  )
}

export default Payment