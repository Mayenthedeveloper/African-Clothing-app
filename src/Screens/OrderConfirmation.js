import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import data from '../data';
import AppContext from '../AppContext'
import  config  from '../config'
import TokenService from '../services/token-service'


function OrderConfirmation(props){
    const context = useContext(AppContext)
    if(context.cart.length > 0){
    context.cart.map(item => {
        context.removeFromCart(item.id)
    })
}
//fetch call to delete
if(context.cart.length > 0){
    context.cart.map(item => {
    var product_id = item.id
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
})
}
    return (
        <div className='orderplaced'>
            <h1>
                Success!! Order was placed.
            </h1>
            
        </div>
    )
}

export default OrderConfirmation