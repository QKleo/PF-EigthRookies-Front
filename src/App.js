import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';

import LoginAuth0 from './features/login/LoginAuth0';
import NavBar from './components/NavBar/NavBar'
import ProductDetail from './components/ProductDetail/productDetail.jsx';


function App() {


  return (
    <div className="App">
   

    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginAuth0 />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<HomeScreen/>}/>

      </Routes>
    </>
    </div>
  );
}

export default App;
