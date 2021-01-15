import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';
import data from '../data';
import AppContext from '../AppContext'


function ProductScreen(props){
    const context = useContext(AppContext)
    const [quantity, setQuantity] = useState(1)
    console.log(props.match.params.id)
    const product = data.products.find(x=> x.id === props.match.params.id );

    const handleSubmit = (e)=> {
        e.preventDefault()
        const item = { 
            name: product.name,
            size: product.size,
            price: product.price,
            quantity
        }
        context.addToCart(item)
    }
    
    return(
        <div>
            <div className='back-to-result'>
                <Link to='/'>Back to result</Link>
            </div>
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
                            Price:{product.price}
                        </li>
                        <li>
                            Status:{product.status}
                        </li>
                        <li>
                            Qty: <select onChange={(e)=> setQuantity(e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </li>
                        <li>
                            <button className="button" type="submit">
                                Add to cart
                            </button>
                        </li>
                    </ul>
                    </form>
                </div>
            </div>
            
        </div>
    )
}

export default ProductScreen;