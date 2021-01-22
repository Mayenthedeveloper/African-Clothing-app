import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import config from '../config'

function RegisterScreen(prop){

    const user = {}
    // const [input, setInput] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    //     rePassword: ''
    // })
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

   const handleSubmit = (e) =>{
        e.preventDefault();
       user.name = name
       user.email = email
       user.password = password
        fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
            'content-type': 'application/json'
            },
            body: JSON.stringify(user),
            })
            .then(res => {
                console.log("user adedd")
            })
            .catch(error => {
            console.error({ error })
        })
}


   const handleInputChange =(e)=>{ 
    e.preventDefault();
    
}

   

    return(
        <div className='form' onSubmit={handleSubmit}>
            <form>
                <ul>
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