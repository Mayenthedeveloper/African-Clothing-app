import React, {useContext} from 'react';
import { Link } from 'react-router-dom'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'
import './Header.css'
import AppContext from '../AppContext'

function Header({cart, openMenu}) {
    const context = useContext(AppContext)
    const handleLogoutClick = () => {
        TokenService.clearAuthToken()
        /* when logging out, clear the callbacks to the refresh api and idle auto logout */
        TokenService.clearCallbackBeforeExpiry()
        IdleService.unRegisterIdleResets()
        context.setLoggedStatus(TokenService.hasAuthToken())
        var el = document.getElementById("hero")
        el.classList.remove("hide")
          document.getElementById("shopNowBtn").classList.remove("dontShow");
          document.getElementById("checkOutHeading").classList.remove("dontShow");
        
    }

    const handleTitleClick = () => {
        var el = document.getElementById("hero")
        if(el.classList.contains("hide"))
        {
          el.classList.remove("hide")
          document.getElementById("shopNowBtn").classList.remove("dontShow");
          document.getElementById("checkOutHeading").classList.remove("dontShow");
        }
        else
        {
          el.classList.add("hide")
          document.getElementById("shopNowBtn").classList.add("dontShow");
          document.getElementById("checkOutHeading").classList.add("dontShow");
        }
    }

    return (


        <header className='header'>
            <div className='brand'>
                <button onClick={openMenu}>
                    &#9776;
          </button>
            </div>
            <div className='header-links'>
                <Link id="webTitle" onClick={handleTitleClick} to='/'>African Clothing</Link>
            </div>
            <div className='header-links'>
                <Link  id="cartCount" to='/cart'>Cart- {cart.length}</Link>
                {
                    context.loggedStatus ? 
                    <Link onClick={handleLogoutClick}  to='/'> Log out </Link> : 
                    <Link to='/signin'> Sign In </Link>
                }
                

            </div>
        </header>
        // <div>
        //     <Link
        //         onClick={handleLogoutClick}
        //         to='/'>
        //         Logout
        //     </Link>
        //     <Link
        //   to='/register'>
        //   Register
        // </Link>

        // </div>
    )
}

export default Header;