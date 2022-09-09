import {useState} from 'react'
import {useAuthContex} from '../contextos/authContext'
import md5 from 'md5'
import {guardarNombre} from '../store/action'
import {useDispatch} from 'react-redux'


const Login = ()=> {

  
  const {login}=useAuthContex()
  const [userLogin,setUserLogin]=useState('')
  const [userPassword,setUserPassword]=useState('')
  const [message,setMessage]=useState(false)
  
  
  const dispatch=useDispatch()


  function handleInputChange(event){
    setUserLogin(event.target.value)
  }
  function handleInputChangePassword(event){
    setUserPassword(event.target.value)
  }

  const usuario_existe = async()=>{
    let result = await 
    fetch(`http://localhost/php_rest_myblog/api/usuarios/read_single.php?correo=${userLogin}&password=${md5(userPassword)}`)
    result=await result.json()
    return result
  }

  async function handlerSubmit(event){
      event.preventDefault()

      const datos= await usuario_existe()
      // console.log(datos)

      if(datos.existe){
        dispatch(guardarNombre({nombre:datos.nombre,email:datos.correo}))
        window.localStorage.setItem('nombre',datos.nombre)

        login()

      }else{
        setMessage(true)
      }
  }

    return (
<>
      <div className="wrapper fadeInDown">
          <div id="formContent" className={message? 'message' :null}>
        {/* <!-- Tabs Titles -->
    
        <!-- Icon --> */}
              <div className="fadeIn first">
                <i className="icon ion-md-contact lead tamano"></i>
              </div>
    
        {/* <!-- Login Form --> */}
              <form onSubmit={handlerSubmit}>
                <input type="text" id="login" className="fadeIn second" name="Usuario" placeholder="Usuario" value={userLogin} onChange={handleInputChange}/>
                <input type="password" id="password" className="fadeIn third" name="login" placeholder="Contraseña" value={userPassword} onChange={handleInputChangePassword} />
                <input type="submit" className="fadeIn fourth" value="Entrar" />
              </form>
            
          </div>
      

        </div>

</>
    );
    
  }
  export default Login;
  