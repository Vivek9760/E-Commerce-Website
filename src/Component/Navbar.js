import { Button, ButtonGroup } from '@mui/material'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar(){
    return(
        
        <div className="container">
        <div className='space1'>
            
        </div>
         <div className='container_2'>
         <div className='heading-container'>
                <ButtonGroup variant='outlined' size='small' color='success'>
                    <Link className='link' to="/"><Button id="h1" variant='contained' >Heading 1</Button></Link>
                    <Link className='link' to="/"><Button id="h2" >Heading 4</Button></Link>
                    <Link className='link' to="/"><Button id="h3" >Heading 2</Button></Link>
                    <Link className='link' to="/"><Button id="h4" >Heading 3</Button></Link>
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