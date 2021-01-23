import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
// import data from '../data'

import AppContext from '../AppContext'

function CartScreen (props){

    // const { cartItems } = cart;
    const context = useContext(AppContext)
    var itemList = []
    context.cart.forEach(item=> {
        if(!(item.id in itemList))
        {
            var itemid = item.id
            itemList[itemid] =  item
        }
        else{
            var tempItem = itemList[item.id]
            tempItem.quantity = parseInt(tempItem.quantity) + parseInt(item.quantity); //typecasting 
            itemList[item.id] = tempItem
        }
    })

    console.log(itemList)
    
    // const productId = props.match.params.id;
    var finalAmount = 0
    context.cart.forEach(item=> {
        finalAmount += item.price
    })
    const [total, setTotal] = useState(finalAmount)
    
    const setTot = () => {
        setTotal(finalAmount)
    }

    const removeItem = (itemId) => {
            var elementName = "pro" + itemId
            document.getElementById(elementName).style.display = "none"
            finalAmount = finalAmount - itemList[itemId].price
            setTot()
    }
  

    return(
        <div className='cart'>
            <div className='cart-list'>
                        <h3>
                            Shopping Cart
                        </h3>

                    <table id="cartTable">
                       
                    {
                        itemList.map(item=>
                            <tr id = {"pro"+item.id}>
                               <td >
                                    <img className="cart-image" src={item.image} alt="product" />
                                </td> 
                                <td>
                                    <Link to={"/product/" + item.id}>
                                    {item.name}
                                    </Link>
                                </td>
                                <td>
                                    Quantity:
                                <select value = {item.quantity}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
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
                        Subtotal : $ {total}
                    </h3>
                    <Link to='/signin'>
                        <button>Place Order</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default CartScreen;