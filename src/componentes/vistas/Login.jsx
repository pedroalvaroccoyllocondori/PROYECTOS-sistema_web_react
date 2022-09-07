import {useState,useEffect} from 'react'
import {useAuthContex} from '../contextos/authContext'

const Login = ()=> {


  const {login}=useAuthContex()
  const [userLogin,setUserLogin]=useState('')
  const [userPassword,setUserPassword]=useState('')
  const [message,setMessage]=useState(false)
  const[informacion,setInformacion]=useState(null)



  // useEffect(()=>{
  // fetch("http://localhost/php_rest_myblog/api/usuarios/read_single.php?correo=pedro_alvaro@outlook.com.pe&password=202cb962ac59075b964b07152d234b70")
  // .then((res) => res.json())
  // .then(
  //     // data=>console.log(data)
  //     data=>setInformacion(data)
  //     )

  // },[])




  function handleInputChange(event){
    setUserLogin(event.target.value)
  }
  function handleInputChangePassword(event){
    setUserPassword(event.target.value)
  }
  



  function handlerSubmit(event){

    //  function logear(correo,password){

    //   fetch(`http://localhost/php_rest_myblog/api/usuarios/read_single.php?correo=${correo}&password=${password}`)
    //   .then((res) => res.json())
    //   .then(
    //       // data=>console.log(data)
    //       data=>setInformacion(data)
    //       )
    //    mensaje=informacion.mensaje
    //    return mensaje
    // }
    
  
    // const login= logear(correo,password)


    event.preventDefault()


    if (userLogin==='admin' && userPassword==='123') {
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
  