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
    console.log("Context:")
    console.log(context.cart)
    // var itemList = []
    // context.cart.forEach(item=> {
    //     if(!(item.id in itemList))
    //     {
    //         var itemid = item.id
    //         itemList[itemid] =  item
    //     }
    //     else{
    //         var tempItem = itemList[item.id]
    //         tempItem.quantity = parseInt(tempItem.quantity) + parseInt(item.quantity); //typecasting 
    //         itemList[item.id] = tempItem
    //     }
    // })
    
    if(userLoggedin != "loggedin")
    {
        userHasLoggedIn = false
       /// alert("User Out")
    }
    else
    {
        //alert("User In")
        userHasLoggedIn = true
    }

    const handleOrder = () => {
        //call backend servie to 1. insert in ORder table
    }

    
    //const productId = props.match.params.id;
    
    const [total, setTotal] = useState(0)


    // var tot = 0
    // context.cart.map(item=> {
    //    tot += parseFloat(item.price)
    // })

//    setTotal(tot)

const cartTotal = ()=>{
    
    let tot = 0;
    
    context.cart.map(item=> {
        tot += parseFloat(item.price)
     })
     return tot
    
}
console.log(cartTotal())
    
    const removeItem = (product_id, product_price, id) =>{
        // tot = tot - parseFloat(product_price)
        // console.log("Total:" + tot)
        console.log("Fetch call to clear one product")
        var tr = document.getElementById("pro"+id);
        tr.style.display = "none"
        if(TokenService.hasAuthToken()){
            const {user_id} = TokenService.readJwtToken()
            var reqBody = {
                user_id : user_id,
                product_id : product_id
            }
            console.log(reqBody.product_id)
            fetch(`${config.API_ENDPOINT}/cart/${user_id}`,{
                method: 'DELETE',
                headers: {
                    "content-type": "application/json",
                  },
                body: JSON.stringify(reqBody)
            })
            .then(() => {
                console.log('Deleted...')
                context.removeFromCart(product_id)
            })
        }
        
    }

    

    // const removeItem = (itemId) => {
    //         var elementName = "pro" + itemId
    //         document.getElementById(elementName).style.display = "none"
    //         finalAmount = finalAmount - itemList[itemId].price
    //         setTot()


    //         //backend to run the delte query with productID = itemId
    // }

    const updateOrderQty = () => {
        //call to backend to run update quert with new quantity
    }
  

    return(
        <div className='cart'>
            <div className='cart-list'>
                        <h3>
                            Shopping Cart
                        </h3>

                    <table id="cartTable">
                       
                    {
                        context.cart.map(item=>
                            <tr id = {"pro"+item.id}>
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
                                <select value = {item.quantity} onChange = {updateOrderQty}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select> */}
                                </td>
                                <td>
                                <button type="button" className="button" onClick={(e)=> removeItem(item.product_id, item.price, item.id)} >
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