import { Routes, Route } from 'react-router-dom';
import React, { useEffect, useMemo } from 'react';
import ControlPanel from './Components/ControlAdmin/AdminScreen/ControlPanel';
// import HomeScreen from './Components/Home/HomeScreen';
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
import { useDispatch , useSelector } from 'react-redux';
import { postOrder , getOrder} from './Redux/actionsCarrito';

import FormUser from './Components/Users/FormUser'

import Preview from './Components/Mercadopago/Preview';
import { findOrCreateUser } from './Redux/actions';




function App() {
  const {isAuthenticated, user} = useAuth0();
  const userActive = useSelector((state) => state.userActive);
  const dispatch = useDispatch();
  const inCart = useSelector((state) => state.inCart);
  const resPostOrder = useSelector((state) => state.postOrder);
  
  useMemo(() => {
    if(isAuthenticated && userActive.length > 0){
      console.log(userActive, "soy useractive")
    const cart = window.localStorage.getItem("cartItems");
    if(cart){
      var parsedCart = JSON.parse(cart);
      parsedCart.map((el) => 
        dispatch(postOrder({...el, amount: el.quantity, email:user.email, productId: el.id, status: "inCart"}))
       
      );
      localStorage.removeItem("cartItems")
      }
    }
  }
  ,[isAuthenticated, userActive])

  useEffect(() => {
    if(isAuthenticated && userActive.length > 0){
      console.log("entre al useEffect")
      dispatch(getOrder({ status: 'inCart', user: user.email }))

    }
    if(userActive[0]==='banned'){isAuthenticated=false}
   
    if (isAuthenticated && !userActive.length) {
      dispatch(findOrCreateUser({
        email: user.email,
        first_name: user.given_name || user.nickname,
        last_name: user.family_name || undefined,
        image: user.picture,
        

      }));
    }

  }, [isAuthenticated, userActive, resPostOrder]);

  return (
    <div>

      <NavBar inCart={inCart} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginAuth0 />} />
        <Route path="products/:id" element={<ProductDetail />} />
        {/* <Route path="/products" element={<HomeScreen />} /> */}
        <Route path={`/search`} element={<Category />} />
        <Route path={`/checkout`} element={<PurchasePage />} />
        <Route path={`/purchase/:purchaseId`} element={<Preview />} />


        <Route exact path='/admin/controlpanel' element={<ControlPanel />} />
        <Route exact path='/edit/profile' element={<FormUser/>}/>

        <Route exact path='/products/carrito' element={<Carrito />} />
      </Routes>
      <ToastContainer />
      <Footer />

    </div>
  );
}

export default App;
