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
                    <Button id="h1" variant='contained' >Heading 1</Button>
                    <Button id="h2" >Heading 4</Button>
                    <Button id="h3" >Heading 2</Button>
                    <Button id="h4" >Heading 3</Button>
                </ButtonGroup>
            </div>
         </div>
         <div className='space2'>
         </div>
        <div className='container_3'>
            <div className='btn-container'>
                <div className='btn-main-container'>
               <Link to="/signup"><Button id="btn1" size='small' color='error' variant='contained'> Sign up </Button></Link>
                </div>
                <div className='btn-main-container'>
                <Link to="/login"><Button id="btn2" size='small' color='error' variant='contained'>Log In</Button></Link>
                </div>
            </div>

        </div>
        </div>
    )
}

export default Navbar