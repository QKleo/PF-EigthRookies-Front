import { Routes, Route } from 'react-router-dom';
import LoginAuth0 from './Features/Login/LoginAuth0';
import NavBar from './Components/NavBar/NavBar'


function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/login' element={<LoginAuth0 />} />
      </Routes>
    </>
  );
}

export default App;
