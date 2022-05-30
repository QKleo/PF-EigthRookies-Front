import {Routes, Route} from 'react-router-dom'

import HomeScreen from './Screens/HomeScreen';
import Landing from './Components/Landing/Landing'
import LoginAuth0 from './features/login/LoginAuth0';
import NavBar from './Components/NavBar/NavBar';
import ProductDetail from './Components/ProductDetail/productDetail';
import CreateProductScreen from './Screens/CreateProductScreen';
import Category from './Components/Category/Category';
import Carrito from './Components/Carrito';

function App() {

  return (
    <div>
   
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginAuth0 />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<HomeScreen/>}/>
        <Route path="/category/:id" element={<Category/>}/>
        

        <Route path="/admin/products" element={<CreateProductScreen />} />
        <Route exact path='/products/carrito'element={<Carrito/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
