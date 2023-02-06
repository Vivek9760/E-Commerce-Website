import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Component/Login';
import Navbar from './Component/Navbar';
import PrivateComponent from './Component/PrivateComponent';
import Profile from './Component/Profile';
import Signup from './Component/Signup';

function App() {
  return (<>
   <BrowserRouter>
   <Navbar />
   <Routes>
    <Route element={<PrivateComponent />}>
    <Route path='/' element={<h1>Products</h1>} />
    <Route path='/myproducts' element={<h1>My Products</h1>} />
    <Route path='/wishlist' element={<h1>Wishlist</h1>} />
    <Route path='/profile' element={<Profile />} />
    </Route>
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
