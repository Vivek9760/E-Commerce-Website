import { useParams,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import { Container, TextField, Button } from "@mui/material";
import { CurrencyRupee } from "@mui/icons-material";

const UpdateProduct = ()=>{

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
    const params = useParams();
    const id = params.id;
    
    const getProductData = async() =>{
        let data = await fetch(`http://localhost:5000/getProduct/${id}`,{
            method:'get'});
            data = await data.json();
            console.log(data)
            if(data){
                setName(data.name);
                setCategory(data.category);
                setCompany(data.company);
                setPrice(data.price);
            }
    }

    useEffect(()=>{
        getProductData();
    },[])
  
  const updateProduct = async()=>{
      if(name.length>0 && category.length>0 && company.length>0 && price.length>0){
          let data = await fetch(`http://localhost:5000/updateProduct/${id}`,{
            method:'put',
            body:JSON.stringify({name,category,company,price}),
            headers:{
                'Content-Type':'application/json'
            }
          })
          data = data.json();
          if(data){
        navigate('/myproducts');
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

    return(
        <>
    
        <div className='Login-container'>
            <h1>Update Product</h1>
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
            <Button variant="contained" onClick={updateProduct}  size="large">Confirm</Button>
            </div>
            </div>
          </Container>
        </div>
        <Footer />
        </>
    )
}

export default UpdateProduct