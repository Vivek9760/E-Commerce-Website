import { Grid, Paper,InputBase} from "@mui/material";
import { Add, CurrencyRupee, Menu, Search, Delete, Sell, DriveFileRenameOutline } from "@mui/icons-material";
import './MyProducts.css';
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProducts = () =>{

    const [productList,setProductList]=useState('')
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const id = JSON.parse(localStorage.getItem('user'))._id;
   
    const addProduct = () =>{
        navigate('/addproduct');
    }

    const getProductList = async() =>{
        let data = await fetch(`http://localhost:5000/myproduct/${id}`,{method:'get',
        headers:{
            "Content-Type":"application/json",
            authorization: JSON.parse(localStorage.getItem('token'))
        }
    });
        data = await data.json();
        setProductList(data);        
    }
    
    const startSearch = async() => {
            if(search){
            let data = await fetch(`http://localhost:5000/searchMyProducts/${search}/${id}`,{
                method:'get',
        headers:{
            authorization: JSON.parse(localStorage.getItem('token'))
        }
            });
            data = await data.json();
            if(data.length>0){
                setProductList(data);
            }
            else if(data.length === 0){
                setProductList('');
            }}

            else{
                getProductList();
            }
        }
    

    useEffect(()=>{
        getProductList();
    },[])

    const deleteProduct = async(id) =>{

        await fetch(`http://localhost:5000/deleteProduct/${id}`,{
          method : 'delete',
          headers:{
            authorization:JSON.parse(localStorage.getItem('token'))
          }
        });

        getProductList();
    }


    return(<>
        <div className="card-container">
            <div className="search-container">
        <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
        <Menu />
      
      <InputBase
        onChange={(e)=>{setSearch((e.target.value).trimStart())}}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Products"
        inputProps={{ 'aria-label': 'search products','value':`${search}` }}
      />
      <Search id="search" onClick={startSearch}/> 
    </Paper>
    </div>
            <div className="card-main-container">
        <Grid id="c1" spacing={2} container>
{productList.length>0 ? productList.map((item)=>{
    let email = JSON.parse(localStorage.getItem('user')).email;
    return(
            <Grid key={item._id} item lg={3} md={4} sm={5} xs={8}> 
            <div className="card">
                <div className="category"><p className="p1" title={item.company}>{(item.company).toUpperCase()}</p></div>
                <div className="name"><h3 className="p2" title={item.name}>{item.name}</h3></div>
                <div className="company"><p className="p3" title={item.category}>{item.category}</p></div>
                <div className="email"><h5 className="p4"><a className="mailto" href={`mailto:${email}`}>{email}</a></h5></div>
                <div className="price-container"><div className="price"><CurrencyRupee id="product-price" /><h3 className="p5" title={item.price}>{item.price}</h3></div>
                <Sell id="sell-icon" />
                <Delete titleAccess="Delete Product" onClick={()=>{deleteProduct(item._id)}} id="delete-icon" />
                <DriveFileRenameOutline titleAccess="Update Product" onClick={()=>{navigate(`/updateProduct/${item._id}`)}} id="update-icon" />
                </div>
            </div>
            </Grid>)}
) : <></>}

            <Grid item lg={3} md={4} sm={5} xs={8}><div className="card">
               <div className="add-btn"> <Add id='addicon' onClick={addProduct}/> </div> 
            </div></Grid>
        </Grid>
        </div>
        </div>
        <Footer />
        </>
    )
}


export default MyProducts;