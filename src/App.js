import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';

function App() {
  return (<>
   <BrowserRouter>
   <Navbar />
   <Routes>
    <Route path='/login' element={<h1>Login Page</h1>} />
    <Route path='/signup' element={<h1>SignUp Page</h1>} />

   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
