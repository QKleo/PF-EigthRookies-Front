import {Routes, Route} from 'react-router-dom'

import HomeScreen from './screens/HomeScreen';
import Landing from './components/Landing/Landing'
import LoginAuth0 from './features/login/LoginAuth0';
import NavBar from './components/NavBar/NavBar';
import ProductDetail from './components/ProductDetail/ProductDetail';
import CreateProductScreen from './screens/CreateProductScreen';
import Category from './Components/Category/Category';


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
      </Routes>
    
    </div>
  );
}

export default App;
