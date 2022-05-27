import {Routes, Route} from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';

import LoginAuth0 from './features/login/LoginAuth0';
import NavBar from './components/NavBar/NavBar'
import ProductDetail from './components/ProductDetail/productDetail';
import Landing from './components/Landing/Landing';


function App() {


  return (
    <div>
   

    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginAuth0 />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<HomeScreen/>}/>

      </Routes>
    </>
    </div>
  );
}

export default App;
