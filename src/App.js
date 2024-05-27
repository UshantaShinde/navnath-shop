import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products'
import About from './pages/About/About'
import Brand from './pages/BrandPage/Brand';
import ProductPage from "./pages/ProductPage/ProductPage"
import Signup from './pages/Login/Signup';
import Login from './pages/Login/Login';
import Cart from './pages/Cart/Cart';
import Admin from './Admin/Admin'
import AddProduct from './Admin/AddProduct';
import Cartstate from './context/CartState';
import Contact from './pages/Contact/Contact';
import ViewContact from './Admin/ViewContact';
import ViewProducts from './Admin/ViewProducts';
import Payment from './pages/Payment/Payment';
import Myprofile from './pages/Myprofile/Myprofile';
import Orders from './pages/Orders/Orders';
import AddDetails from './pages/Myprofile/AddDetails';
import AddAddress from './pages/Address/AddAddress';
import OrdersReport from './Admin/OrdersReport';
import ViewUsers from './Admin/ViewUsers';
import Report from './Admin/Report';
import UpdateProduct from './Admin/UpdateProduct';
import Bills from './Admin/Bills';
function App() {


  return (
    <div className="App">
      <Cartstate>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="productpage/:id" element={<ProductPage />} />
              <Route path="about" element={<About />} />
              <Route path="brand/:id" element={<Brand />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
              <Route path="cart" element={<Cart />} />
              <Route path="contact" element={<Contact />} />
              <Route path="payment" element={<Payment />} />
              <Route path="profile" element={<Myprofile />} />
              <Route path="adddetails" element={<AddDetails />} />
              <Route path="addaddress" element={<AddAddress />} />
              <Route path="orders" element={<Orders />} />
            </Route>
            <Route path='/admin' element={<Admin />}>
              <Route index element={<Report />} />
              <Route path='/admin/addproduct' element={<AddProduct />} />
              <Route path='/admin/viewproducts' element={<ViewProducts />} />
              <Route path='/admin/updateproduct/:id' element={<UpdateProduct />} />
              <Route path='/admin/viewcontact' element={<ViewContact />} />
              <Route path='/admin/ordersreport' element={<OrdersReport />} />
              <Route path='/admin/viewusers' element={<ViewUsers />} />
              <Route path='/admin/report' element={<Report />} />
              <Route path='/admin/bills' element={<Bills />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </Cartstate>

    </div>
  );
}

export default App;

//Git changes done by Prajakta

// Git Changes done by Aishwarya .

// Started with new changes by Aishwarya
//Git practice -new changes done by prajakta
