import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
// import data from '../data';
import AppContext from '../AppContext';
import config from '../config'
import TokenService from '../services/token-service'


function ProductScreen(props){
    const context = useContext(AppContext)
    const [quantity, setQuantity] = useState(1)
   
    const {id} =  props.match.params
    // const product = data.products.length ? data.products.find(product=> product.id === parseInt(id)) : {}
    const product = context.products.length ? context.products.find(product=> product.id === parseInt(id)) : {}


    const handleSubmit = (e)=> {
        e.preventDefault()
        if(TokenService.hasAuthToken()){
            const {user_id} = TokenService.readJwtToken()

            fetch(`${config.API_ENDPOINT}/cart` ,{
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify({user_id, product_id : parseInt(id)})
            })
            .then(() => {
                fetch(`${config.API_ENDPOINT}/cart/${user_id}`)
                .then(res =>res.json())
                .then(cart => context.setCart(cart))
            })
            

        }
    //    const item = { 
    //         name: product.name,
    //         size: product.size,
    //         image: product.image,
    //         quantity: quantity,
    //         id: product.id,
    //         price: product.price * quantity,
    //     }

            
        // const removeItem = (product_id) =>{
        //     if(TokenService.hasAuthToken()){
        //         const {user_id} = TokenService.readJwtToken()
    
        //         fetch(`${config.API_ENDPOINT}/cart/${user_id}`,{
        //             method: 'DELETE',
        //             headers: {
        //                 "content-type": "application/json",
        //               },
        //             body: JSON.stringify({product_id})
        //         })
        //         .then(() => {
        //             console.log('Deleted...')
        //             context.removeFromCart(product_id)
        //         })
        //     }
            
        // }   
            

        // const addItemsToCart = () =>{
        //     fetch(`${config.API_ENDPOINT}/cart` ,{
        //         method: 'POST',
        //         heades:{
        //             'content-type': 'application/json'
        //         },
        
        //     })
        //     .then(res =>{
        //         if(!res.ok){
        //             return res.json().then(e => Promise.reject(e))
        //             return res.json()
        //         }
        //     })
    
        //     .catch(error =>{
        //         console.error({error})
        //     })
        // }



        // context.addToCart(item)
        
        // fetch(`${config.API_ENDPOINT}/cart` ,{
        //     method: 'POST',
        //     heades:{
        //         'content-type': 'application/json'
        //     },
    
        // })
        // .then(res =>{
        //     if(!res.ok){
        //         return res.json().then(e => Promise.reject(e))
        //         return res.json()
        //     }
        // })

        // .catch(error =>{
        //     console.error({error})
        // })

        
    }





    // const setQty = (quantity) => {
    //     setQuantity(quantity);
    // }
    
    return(
        <div>
            <div className='back-to-result'>
                <Link to='/'>Back to result</Link>
            </div>
            {!!Object.keys(product).length && 
            <div className='details'>
                <div className='detail-image'>
                    <img src={product.image} alt='product'></img>
                </div>
                <div className='detail-info'>
                    <ul>
                        <li>
                             <h4>{product.name}</h4> 
                        </li>
                        <li>
                             {product.brand}
                        </li>
                        <li>
                             {product.size}
                        </li>
                        <li>
                            Price: <b>${product.price}</b>
                        </li>
                        <li>
                             Description:
                             <div>
                              {product.description}   
                             </div>
                        </li>
                    </ul>
                </div>

                <div className='details-action'>
                    <form onSubmit={handleSubmit}>
                    <ul>
                        <li>
                            Price:${product.price}
                        </li>
                        <li>
                            Status:{product.status}
                        </li>
                        <li>
                            {/* Qty: <select>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select> */}
                        </li>
                        <li>
                            <button className="button" type="submit" >
                                Add to cart
                            </button>
                        </li>
                    </ul>
                    </form>
                </div>
            </div>
            }
        </div>
    )
}

export default ProductScreen;