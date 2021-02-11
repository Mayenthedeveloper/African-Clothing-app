import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext'
import TokenService from '../services/token-service'
import OrderConfirmation from './OrderConfirmation'
import config from '../config'

function CartScreen (props){

    const [userLoginStatus, setStatus] = useState("Place Order")
    const userLoggedin = props.location.state
    var userHasLoggedIn = ""

    const context = useContext(AppContext)
    
    
    if(userLoggedin != "loggedin")
    {
        userHasLoggedIn = false
    }
    else
    {
        userHasLoggedIn = true
    }

    const [total, setTotal] = useState(0)


const cartTotal = ()=>{
    
    let tot = 0;
    
    context.cart.map(item=> {
        tot += parseFloat(item.price)
     })
     return tot
    
}
console.log(cartTotal())

    const removeItem = (product_id) =>{
       
        if(TokenService.hasAuthToken()){
            const {user_id} = TokenService.readJwtToken()
            
            fetch(`${config.API_ENDPOINT}/cart/${user_id}`,{
                method: 'DELETE',
                headers: {
                    "content-type": "application/json",
                  },
                body: JSON.stringify({product_id})
            })
            .then(() => {
                console.log('Deleted...')
                context.removeFromCart(product_id)
            })
        }
        
    }

  

    return(
        <div className='cart'>
            <div className='cart-list'>
                        <h3>
                            Shopping Cart
                        </h3>

                    <table id="cartTable">
                       
                    {
                        context.cart.map((item, i)=>
                            <tr id = {"pro"+item.id} key={i}>
                               <td >
                                    <img className="cart-image" src={item.image} alt="product" />
                                </td> 
                                <td>
                                    <Link to={"/product/" + item.product_id}>
                                    {item.name}
                                    </Link>
                                </td>
                                <td>
                                    {/* Quantity:
                                <select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select> */}
                                </td>
                                <td>
                                <button type="button" className="button" onClick={(e)=> removeItem(item.id)} >
                                    Delete
                                </button>
                            </td>
                            <td className="cart-price">
                                ${item.price}
                            </td>
                            </tr>
                        )
                    }
                    </table>

                <div>
                    <h3>
                        Total : ${cartTotal()}
                    </h3>
                    {
                        userHasLoggedIn ? 
                        <Link to='/orderConfirmation' product = {context.cart}>
                            <button> Finish Placing Order </button>
                        </Link>
                        :
                        <Link to='/signin' product = {context.cart}>
                            <button> Place Order </button>
                      </Link>
                    }
                </div>

            </div>
        </div>
    )
}

export default CartScreen;