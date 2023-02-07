import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Component/Login';
import Navbar from './Component/Navbar';
import PrivateComponent from './Component/PrivateComponent';
import Profile from './Component/Profile';
import Signup from './Component/Signup';
import MyProducts from './Component/MyProducts';
import AddProduct from './Component/AddProduct';
import UpdateProduct from './Component/UpdateProduct';
import Products from './Component/Products';

function App() {
  return (<>
   <BrowserRouter>
   <Navbar />
   <Routes>
    <Route element={<PrivateComponent />}>
    <Route path='/' element={<Products />} />
    <Route path='/myproducts' element={<MyProducts />} />
    <Route path='/wishlist' element={<h1>Wishlist</h1>} />
    <Route path='/profile' element={<Profile />} />
    <Route path='/addproduct' element={<AddProduct />} />
    <Route path='/updateProduct/:id' element={<UpdateProduct />} />
    </Route>
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
