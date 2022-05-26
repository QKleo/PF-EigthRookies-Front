import { Routes, Route } from 'react-router-dom';
import LoginAuth0 from './Features/Login/LoginAuth0';
import NavBar from './Components/NavBar/NavBar';
import ProductDetail from './productDetail';

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginAuth0 />} />
        <Route path="products/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
