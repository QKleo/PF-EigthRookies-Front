import { Routes, Route } from 'react-router-dom';
import './App.css';
import LoginAuth0 from './Features/Login/LoginAuth0';
import { useAuth0 } from '@auth0/auth0-react';
import ProductDetail from './productDetail';

function App() {

  const {isAuthenticated, user, logout} = useAuth0()

  return (
    <div className="App">
      {
        isAuthenticated
        ? <div>
                <img src={user.picture} alt={user.name}/>
                <h1>Hola {user.name}</h1>
                <p>{user.email}</p>
                <button onClick={logout} >Salir</button>
            </div>
        : <h1>Bienvenido a "The Rookies"</h1>
      }
      <Routes>
        <Route path="/login" element={<LoginAuth0 />} />
        <Route path="products/:id" element={<ProductDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
