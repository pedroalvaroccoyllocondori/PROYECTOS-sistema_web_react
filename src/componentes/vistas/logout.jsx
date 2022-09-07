import {useEffect} from 'react'
import {useAuthContex} from '../contextos/authContext'



const Logout = ()=> {

  const{logout} =useAuthContex() 
  useEffect(()=>{
    logout()
  })

   return null
    
  }
  export default Logout;
  