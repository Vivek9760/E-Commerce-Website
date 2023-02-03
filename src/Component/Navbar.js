import { Button, ButtonGroup } from '@mui/material'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar(){
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
                    <Button id="h1" ><Link className='link' to="/">Products</Link></Button>
                    <Button id="h2" ><Link className='link' to="/">My Products</Link></Button>
                    <Button id="h3" ><Link className='link' to="/">Wishlist</Link></Button>
                    <Button id="h4" ><Link className='link' to="/">Profile</Link></Button>
                </ButtonGroup>
            </div>
         </div>
         <div className='space2'>
         </div>
        <div className='container_3'>
            <div className='btn-container'>
                <div className='btn-main-container'>
               <Link className='link' to="/signup"><Button id="btn1" size='small' color='error' variant='contained'> Sign up </Button></Link>
                </div>
                <div className='btn-main-container'>
                <Link className='link' to="/login"><Button id="btn2" size='small' color='error' variant='contained'>Log In</Button></Link>
                </div>
            </div>

        </div>
        </div>
    )
}

export default Navbar