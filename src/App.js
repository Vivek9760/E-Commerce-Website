import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Component/Login';
import Navbar from './Component/Navbar';
import Signup from './Component/Signup';

function App() {
  return (<>
   <BrowserRouter>
   <Navbar />
   <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />

   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
