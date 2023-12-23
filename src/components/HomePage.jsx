import React from 'react'
import { Button } from 'react-bootstrap'

function HomePage() {

  const handlelogout=()=>{
    localStorage.removeItem('token'); 

  }
  return (
    <div className='login container'>
    <h2>Welcome To Homepage</h2>
    <Button variant='primary' type='submit' href='/' onClick={handlelogout}>Logout</Button>
    </div>
  )
}

export default HomePage