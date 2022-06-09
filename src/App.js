import { Routes, Route } from 'react-router-dom';
import React, { useEffect, useMemo } from 'react';
import ControlPanel from './Components/ControlAdmin/AdminScreen/ControlPanel';
import HomeScreen from './Components/Home/HomeScreen';
import Landing from './Components/Landing/Landing';
import LoginAuth0 from './Components/Login/LoginAuth0';
import NavBar from './Components/NavBar/NavBar';
import ProductDetail from './Components/ProductDetail/productDetail';
import Category from './Components/Category/Category';
import Carrito from './Components/Carrito/Carrito';
import PurchasePage from './Components/PurchasePage/PurchasePage';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { postOrder } from './Redux/actionsCarrito';



function App() {
  const {user, isAuthenticated} = useAuth0();
  const dispatch = useDispatch();
  useMemo(() => {
    if(isAuthenticated){
    const cart = window.localStorage.getItem("cartItems");
    if(cart){
      var parsedCart = JSON.parse(cart);
      parsedCart.map((el) => 
        dispatch(postOrder({...el, amount: el.quantity, productId: el.id, status: "inCart"}))
       
      );
      localStorage.removeItem("cartItems")
      }
    }
  }
  ,[user])


  return (
    <div>

      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginAuth0 />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<HomeScreen />} />
        <Route path={`/search`} element={<Category />} />
        <Route path="/purchase" element={<PurchasePage />} />


        <Route exact path='/admin/controlpanel' element={<ControlPanel />} />


        <Route exact path='/products/carrito' element={<Carrito />} />
      </Routes>
      <ToastContainer />
      <Footer />

    </div>
  );
}

export default App;
