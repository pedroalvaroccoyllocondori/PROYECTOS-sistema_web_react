import {Navigate,Outlet} from 'react-router-dom'
import {useAuthContex} from '../contextos/authContext'

const PublicRoute = ()=> {

    const {isAuthenticated}=useAuthContex()

    if(!isAuthenticated){
        return <Navigate to="/login"></Navigate>

    }

    return (
      <div>
        <Outlet></Outlet>
      </div>
    );
    
  }
  export default PublicRoute;
  