import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';
import LoginAuth0 from './Features/Login/LoginAuth0';
import NavBar from './Components/NavBar/NavBar'
import ProductDetail from './Components/ProductDetail/productDetail';
import Landing from './Components/Landing/Landing';
// import FilterCategories from './Components/Filters/Filters';
import Category from './Components/Category/Category';


function App() {

  return (
    <div className="App">
   

    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<LoginAuth0 />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<HomeScreen/>}/>
        <Route path="/category/:id" element={<Category/>}/>
        

      </Routes>
    </>
    </div>
  );
}

export default App;
