import { Grid, Paper,InputBase} from "@mui/material";
import { CurrencyRupee, Menu, Search, Favorite, FavoriteBorder, Sell } from "@mui/icons-material";
import './MyProducts.css';
import Footer from "./Footer";
import { useEffect, useState } from "react";

const Products = () =>{

    const [productList,setProductList]=useState('')
    const [fav,setFav]=useState(false);
    const [search, setSearch] = useState('');

    const toggleWishlist = ()=>{
        setFav(!fav);
    }

    const startSearch = () =>{
        console.log(search)
    }

    const getProductList = async() =>{
        let id = JSON.parse(localStorage.getItem('user'))._id;
        let data = await fetch(`http://localhost:5000/products`,{method:'get'});
            data = await data.json();
            if(data){
           data = data.filter((item)=>{
                return(item.userId!==id);
            })
            // console.log(data)
            setProductList(data);
            }
            // console.log(productList);

    }

    useEffect(()=>{
        getProductList();
    },[])


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
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps','value':`${search}` }}
      />
      <Search onClick={startSearch}/> 
    </Paper>
    </div>
            <div className="card-main-container">
        <Grid id="c1" spacing={2} container>
{productList.length>0 ? productList.map((item)=>{
    return(
            <Grid key={item._id} item lg={2} md={3} sm={4} xs={6}> 
            <div className="card">
                <div className="category"><p className="p1" title={item.company}>{(item.company).toUpperCase()}</p></div>
                <div className="name"><h3 className="p2" title={item.name}>{item.name}</h3></div>
                <div className="company">{fav?<Favorite titleAccess="Remove from the wishlist" onClick={toggleWishlist} id="wishlist-Icon" />:<FavoriteBorder titleAccess="Add to wishlist" onClick={toggleWishlist} id="wishlist-Icon" />}<p className="p3" title={item.category}>{item.category}</p></div>
                <div className="email"><h5 className="p4"><a className="mailto" href={`mailto:${item.userEmail}`}>{item.userEmail}</a></h5></div>
                <div className="price-container"><div className="price"><CurrencyRupee id="product-price" /><h3 className="p5" title={item.price}>{item.price}</h3></div>
                <Sell id="sell-icon" />
                </div>
            </div>
            </Grid>)}
) : <Grid item  lg={2} md={3} sm={4} xs={6}> <div className="card">
    <div className="name"><h1 className="p2">No Product Available</h1></div></div></Grid>}
        </Grid>
        </div>
        </div>
        <Footer />
        </>
    )
}


export default Products;