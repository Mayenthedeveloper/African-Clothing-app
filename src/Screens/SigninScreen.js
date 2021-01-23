import React, { useState} from 'react';
import { Link } from 'react-router-dom';


function SigninScreen(props){
    const [email, setEmail] = useState('')
    const [password, setPassword] =useState('')

   const submitHandler = (e)=>{
        e.preventDefault();
        const sign = {
            email: email,
            password: password 
        }
   }
   
   //fetch getbyemail email and password

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
                        <input type='email' name='email' id='email' onChange={(e) => setEmail(e.target.value)}></input>
                    </li>
                    <li>
                        <label>
                            Password
                        </label>
                        <input typ='password' id='password' name='password' onChange={(e) => setPassword(e.target.value)}></input>
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