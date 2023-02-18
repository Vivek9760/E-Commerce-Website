import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { TextField, Container, Button } from "@mui/material";
import Footer from "./Footer";
import "./Login.css";
import { CurrencyRupee} from '@mui/icons-material';


const AddProduct = () => {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [company,setCompany] = useState('');
  const [price,setPrice] = useState('');
  const [nameR, setNameR] = useState('');
  const [categoryR, setCategoryR] = useState('');
  const [companyR,setCompanyR] = useState('');
  const [priceR,setPriceR] = useState('');
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [companyError,setCompanyError] = useState(false);
  const [priceError,setPriceError] = useState(false);
  const navigate = useNavigate('/');


const addProduct = async()=>{
    if(name.length>0 && category.length>0 && company.length>0 && price.length>0){
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const userEmail = JSON.parse(localStorage.getItem('user')).email;
        console.log(userId)
        let product = await fetch("http://localhost:5000/addproduct",{
            method:'post',
            body:JSON.stringify({name,category,company,price,userId,userEmail}),
            headers:{
                'Content-Type':'application/json',
                 authorization : JSON.parse(localStorage.getItem('token'))
            }
        }) ;

        product = await product.json()
        if(product){
            console.log(product); 
            navigate('/myproducts')           
        }else{
            alert("Something Wrong !!!")
        }
    }
    else{
        if(name===""){
            setNameR('*Required Field');
            setNameError(true);
          }else{setNameR(''); setNameError(false)}
      
          if(category===""){
            setCategoryR('*Required Field');
            setCategoryError(true);
          }else{setCategoryR('');  setCategoryError(false);}
      
          if(company===""){
            setCompanyR('*Required Field');
            setCompanyError(true);
          }else{setCompanyR(''); setCompanyError(false);}
      
          if(price===""){
            setPriceR('*Required Field');
            setPriceError(true);
          }else{setPriceR(''); setPriceError(false);}
    }
    
}


  


  return (
    <>
    
    <div className='Login-container'>
        <h1>Add Product</h1>
      <Container fixed variant="outlined" id="Login-main-container">
        <div className="main-container">
        <div className="text-field-container">
        <TextField  value={name}size="small" helperText={nameR} error={nameError} onChange={(e)=>{setName((e.target.value).trimStart());}} label="Enter product name" />
        </div>
        <div className="text-field-container">
        <TextField size="small" helperText={categoryR} error={categoryError} value={category}  onChange={(e)=>{setCategory((e.target.value).trimStart())}} label="Enter product category" type="text" />
        </div>
        <div className="text-field-container">
        <TextField size="small" helperText={companyR} error={companyError} value={company} onChange={(e)=>{setCompany((e.target.value).trimStart())}} label="Enter product company"  type="text" />
        </div>
        <div className="text-field-container">
        <TextField size="small" helperText={priceR} error={priceError} value={price}  onChange={(e)=>{setPrice(e.target.value)}} label="Enter Product Price" type="number" />
        <CurrencyRupee className='showPassword' />
        </div>
        <div className="text-btn-container">
        <Button variant="contained" onClick={addProduct}  size="large">Confirm</Button>
        </div>
        </div>
      </Container>
    </div>
    <Footer />
    </>
  );
};

export default AddProduct;