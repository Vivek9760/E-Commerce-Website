import { Grid} from "@mui/material";
import { Add, CurrencyRupee, Delete, Favorite, FavoriteBorder, Sell, DriveFileRenameOutline } from "@mui/icons-material";
import './MyProducts.css';
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProducts = () =>{

    const [productList,setProductList]=useState('')
    const [fav,setFav]=useState(false);
    const navigate = useNavigate();

    const toggleWishlist = ()=>{
        setFav(!fav);
    }

    const addProduct = () =>{
        navigate('/addproduct')
    }

    const getProductList = async() =>{
        let userId = JSON.parse(localStorage.getItem('user'))._id;
        let data = await fetch(`http://localhost:5000/myproduct/${userId}`,{method:'get'});
            data = await data.json();
            setProductList(data);
            // console.log(productList);

    }

    useEffect(()=>{
        getProductList();
    })


    return(<>
        <div className="card-container">
            <div className="card-main-container">
        <Grid id="c1" spacing={2} container>
{productList.length>0 ? productList.map((item)=>{
    let email = JSON.parse(localStorage.getItem('user')).email;
    return(
            <Grid item lg={2} md={3} sm={4} xs={6}> 
            <div className="card">
                <div className="category"><p className="p1">{(item.company).toUpperCase()}</p></div>
                <div className="name"><h3 className="p2">{item.name}</h3></div>
                <div className="company">{fav?<Favorite titleAccess="Remove from the wishlist" onClick={toggleWishlist} id="wishlist-Icon" />:<FavoriteBorder titleAccess="Add to wishlist" onClick={toggleWishlist} id="wishlist-Icon" />}<p className="p3">{item.category}</p></div>
                <div className="email"><h5 className="p4"><a className="mailto" href={`mailto:${email}`}>{email}</a></h5></div>
                <div className="price-container"><div className="price"><CurrencyRupee id="product-price" /><h3 className="p5">{item.price}</h3></div>
                <Sell id="sell-icon" />
                <Delete titleAccess="Delete Product" id="delete-icon" />
                <DriveFileRenameOutline titleAccess="Update Product" id="update-icon" />
                </div>
            </div>
            </Grid>)}
) : <></>}

            <Grid item lg={2} md={3} sm={4} xs={6}><div className="card">
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