import logo from './assets/logo-black.png'
import { useState } from 'react'
import Navigation from './Navigation-bar'
import TabMenu from './Tab-Menu'
import BatchRow from './Batch-row'
import MainNav from './Main-Nav'



const Batch=()=>{
  

    return (
        <>
   
     <Navigation/>
      {/* <MainNav/> */}
<BatchRow/>
        
       
        </>
    )
}

export default Batch