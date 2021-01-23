import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import data from '../data';
import AppContext from '../AppContext'

function HomeScreen(props){
  // const context = useContext(AppContext)

  const {id} = props.match.params
  // let products = context.products
  let products = data.products
  if(id){
    //  products = context.products.filter(product=> product.category === id)
    products = data.products.filter(product=> product.category === id)
  }
   
    return(
        <ul className='products'>
        {
         products.map(product => 
      <li key = {product.id}>
        <div className='product'>
        <Link to={'/product/' + product.id}>
          <img className ='product-image' src={product.image} alt='product'/>
        </Link>
          
          <div className='product-name'>
          <Link to={'/product/' + product.id}>{product.name}</Link>
          </div>
          <div className='product-brand'>{product.brand}</div>
          <div className='product-size'>{product.size}</div>
          <div className='product-price'>${product.price}</div>
        </div>
      </li>)
      
        }
      
    </ul>
    )
}

export default HomeScreen;