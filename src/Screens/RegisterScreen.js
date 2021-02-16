import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../services/auth-api-service'

function RegisterScreen(props){

    const user = {}
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

   const handleSubmit = (e) =>{
        e.preventDefault();
       user.name = name
       user.email = email
       user.password = password
       AuthApiService.postUser({
           name,
           email,
           password
       })
       .then(()=>{
           setName('')
           setEmail('')
           setPassword('')
           props.history.push('/signin')
       })

       .catch(res => {
        setError(res.error)
      })
      
}


   const handleInputChange =(e)=>{ 
    e.preventDefault();
    
}

   

    return(
        <div className='form' onSubmit={handleSubmit}>
            <form>
                <ul className='form-container'>
                    <li>
                        <h2>Create Account</h2>
                    </li>
                    <li>
                        <label htmlFor='name'>
                            Name
                        </label>
                        <input type='name' id='name'  name='name' onChange={e => setName(e.target.value)}  required></input>
                    </li>
                    <li>
                        <label htmlFor='email'>
                            Email
                        </label>
                        <input type='email' id='email' name='email' onChange={e => setEmail(e.target.value)}></input>
                    </li>
                    <li>
                        <label htmlFor='password'>
                            Password
                        </label>
                        <input type='password' id='password' name='password' onChange={e => setPassword(e.target.value)} ></input>
                    </li>
                    <li>
                        <label htmlFor='rePassword'>
                            Re-Enter-Password
                        </label>
                        <input type='password' id='rePassword' name='rePassword' onChange={handleInputChange} ></input>
                    </li>
                    <li>
                        <button type="submit" className="button primary" onClick = {handleSubmit}>
                            Register
                        </button>
                    </li>
                    <li>
                        Already have an account?
                        
                    </li>
                    <li>
            
                    <Link to='/signin'>Sign In</Link>
                    </li>
                </ul>
            </form>
        </div>
    )
}

export default RegisterScreen;