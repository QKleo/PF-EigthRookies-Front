import { Routes, Route } from 'react-router-dom';
import React from 'react';

import ControlPanel from './Components/ControlAdmin/AdminScreen/ControlPanel';
import HomeScreen from './Components/Home/HomeScreen';
import Landing from './Components/Landing/Landing';
import LoginAuth0 from './Components/Login/LoginAuth0';
import NavBar from './Components/NavBar/NavBar';
import ProductDetail from './Components/ProductDetail/productDetail';
import CreateProductScreen from './Components/Home/CreateProductScreen';
import Category from './Components/Category/Category';
import Carrito from './Components/Carrito/Carrito';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <div>

      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginAuth0 />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<HomeScreen />} />
        <Route path={`/search`} element={<Category />} />


        <Route exact path='/admin/controlpanel' element={<ControlPanel />} />


        <Route exact path='/products/carrito' element={<Carrito />} />
      </Routes>
      <ToastContainer />
      <Footer />

    </div>
  );
}

export default App;
