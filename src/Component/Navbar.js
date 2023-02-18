
import { AccountCircle, Logout, Login,AppRegistration } from '@mui/icons-material';
import { Button, ButtonGroup } from '@mui/material'
import { Link,useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar(){

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const LogOutUser = ()=>{
        localStorage.clear();
        navigate('/signup');
    }

    return(
        
        <div className="container">
        <div className='img-container'>
            <div className="img-main-container">
            <img className='icon' src={require("./NavbarIcon.png")} alt="Icon" />
            </div>
        </div>
         <div className='container_2'>
         <div className='heading-container'>
                <ButtonGroup variant='contained' size='small' color='warning'>
                    <Button id="h1" onClick={()=>{navigate('/')}}>Products</Button>
                    <Button id="h2" onClick={()=>{navigate('/myProducts')}} >My Products</Button>
                    <Button id="h3" onClick={()=>{navigate('/wishlist')}} >Wishlist</Button>
                    <Button id="h4" endIcon={<Logout id="logout" />} disabled={auth?false:true} color='error' onClick={LogOutUser}>Logout</Button>
                </ButtonGroup>
            </div>
         </div>
         <div className='space2'>
         </div>
         
        <div className='container_3'>
                {
                auth?<div className='btn-container'>
                        <div className='btn-main-container'>
               <Link className='link' to="/profile"><Button id="btn0" size='small' color='success' startIcon={<AccountCircle />} variant='contained'>{JSON.parse(auth).name}</Button></Link>
                </div>
                </div>          
                :
            <div className='btn-container'>
                <div className='btn-main-container'>
               <Link className='link' to="/signup"><Button id="btn1" size='small' startIcon={<AppRegistration id='signup'/>} color='error' variant='contained'> Sign up </Button></Link>
                </div>
                <div className='btn-main-container'>
                <Link className='link' to="/login"><Button id="btn2" startIcon={<Login id="login" />} size='small' color='error' variant='contained'>Log In</Button></Link>
                </div>
            </div>
            }
            
        </div>
        
        </div>
    )
}

export default Navbar