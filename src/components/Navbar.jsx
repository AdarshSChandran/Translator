import { Container, Typography } from '@mui/material'
import React from 'react'

const Navbar = () => {
  return (
    <Container sx={{display:"flex", justifyContent:"center",alignItems:"center", height:100, marginBottom:"30px"}} className="container">
        <Typography variant='h2' className='navbarHeading'>Translator</Typography>
    </Container>
  )
}

export default Navbar