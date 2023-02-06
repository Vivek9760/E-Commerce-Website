import { Grid} from "@mui/material";
import { Add,CurrencyRupee,Favorite,FavoriteBorder } from "@mui/icons-material";
import './MyProducts.css';
import Footer from "./Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProducts = () =>{

    const [fav,setFav]=useState(false);
    const navigate = useNavigate();

    const toggleWishlist = ()=>{
        setFav(!fav);
    }

    const addProduct = () =>{
        navigate('/addproduct')
    }

    return(<>
        <div className="card-container">
            <div className="card-main-container">
        <Grid id="c1" spacing={2} container>

            <Grid item lg={2} md={3} sm={4} xs={6}> 
            <div className="card">
                <div className="category"><p className="p1">category</p></div>
                <div className="name"><h3 className="p2">name</h3></div>
                <div className="company">{fav?<Favorite onClick={toggleWishlist} id="wishlist-Icon" />:<FavoriteBorder onClick={toggleWishlist} id="wishlist-Icon" />}<p className="p3">company</p></div>
                <div className="email"><h5 className="p4">email</h5></div>
                <div className="price-container"><div className="price"><CurrencyRupee id="product-price" /><h3 className="p5">200</h3></div>
                </div>
            </div>
            </Grid>
            

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