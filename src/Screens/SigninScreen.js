import React, { useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'
import AppContext from '../AppContext'


function SigninScreen(props){
    const [email, setEmail] = useState('')
    const [password, setPassword] =useState('')
    const [error, setError] = useState('')
    const context = useContext(AppContext)

    
   const submitHandler = (e)=>{
        e.preventDefault();
        setError(null) 

    const products = props.product
    // console.log("Before: " + TokenService.readJwtToken())
    // TokenService.clearAuthToken()
    // TokenService.clearCallbackBeforeExpiry()
    // IdleService.unRegisterIdleResets()
    // console.log("After: " + TokenService.readJwtToken())

        AuthApiService.postLogin({
            email,
            password
          })
            .then(() => {
              setEmail('')
              setPassword('')
              context.setLoggedStatus(TokenService.hasAuthToken)
              props.history.push({
                    pathname: '/cart',
                    state: "loggedin"
              })
            //   this.props.onLoginSuccess()
            })
            .catch(res => {
              setError(res.error)
            })
        
   }
   


    return(
        <div className='form'>
            <form onSubmit ={submitHandler}>
                <ul>
                    <li>
                        <h2>Sign-In</h2>
                    </li>
                    
                    <li>
                        <label>
                            Email
                        </label>
                        <input type='email' value={email} name='email' id='email' placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}></input>
                    </li>
                    <li>
                        <label>
                            Password
                        </label>
                        <input type='password' value={password} id='password' name='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                    </li>
                    <li>
                        <button type='submit' className='button primary'>SignIn</button>
                    </li>
                    <li>
                        New to African Clothings
                    </li>
                    <li>
            
                    <Link to='/register'>Create your account</Link>
                    </li>
                </ul>
            </form>

        </div>
    )
}

export default SigninScreen;