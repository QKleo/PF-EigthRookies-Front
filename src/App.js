import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';


function App() {
  return (
    <div className="App">
       <Routes>
        
        <Route path="/products" element={<HomeScreen/>}/>
      </Routes>

    </div>
  );
}

export default App;
