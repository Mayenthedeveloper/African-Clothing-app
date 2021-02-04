import React,{useState, useEffect} from 'react';
import  {  Route, Link } from 'react-router-dom';
// import data from './data';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import './App.css';
import SigninScreen from './Screens/SigninScreen';
import RegisterScreen from './Screens/RegisterScreen';
import AppContext from './AppContext';
import OrderConfirmation from './Screens/OrderConfirmation'
import config from './config'
import Header from './Header/Header'
import TokenService from './services/token-service';




function App() {
  const [cart, setCart] = useState([])
  const [products, setProducts] = useState([])
  const [loggedStatus, setLoggedStatus] = useState(TokenService.hasAuthToken())

  

  useEffect(() => {
    fetch(`${config.API_ENDPOINT}/products`)
    .then(res => res.json())
    .then(products => setProducts(products))
    // setProducts(data)

    if(TokenService.hasAuthToken()){
      const {user_id} = TokenService.readJwtToken()

      fetch(`${config.API_ENDPOINT}/cart/${user_id}`)
    .then(res => res.json())
    .then(products => setCart(products))
    }
    
  }, [])

  
  const openMenu = ()=> {
    document.querySelector('.sidebar').classList.add('open');

  };

  const closeMenu = ()=> {
    document.querySelector('.sidebar').classList.remove('open');
  };

  const addToCart = (item)=>{
    setCart([...cart, item])
  }

  const removeFromCart = (id) =>{
    setCart(cart.filter(item => item.id !== id))
  }

  const addItemsToCart = (id) =>{
    setCart(cart.filter(item => item.id !== id))
  }
  

  const value = {
    cart,
    addToCart,
    products,
    loggedStatus,
    setLoggedStatus,
    setCart,
    removeFromCart,
    addItemsToCart
  }

  return (
    <AppContext.Provider value ={value}>
    <div className='grid-container'>
      <Header
        openMenu = {openMenu}
        cart = {cart}
        
        />
      {/* <header className='header'>
        <div className='brand'>
          <button onClick={openMenu}>
            &#9776;
          </button>
        </div>
        <div className='header-links'>
          <Link to='/'>African Clothing</Link>
        </div>
        <div className='header-links'>
           <Link to='/cart'> Cart-{cart.length}</Link>
          <Link to='/signin'> Sign In </Link>
          
        </div>
      </header> */}
      <aside className='sidebar'>
        <h3>Shopping Categories</h3>
        <button className='sidebar-close-button' onClick={closeMenu}>X</button>
        <ul className='categories'>
          <li key="category1"><Link to='/category/Skirt and Blouse'>Skirt and Blouse</Link></li>
          <li key="category2"><Link to='/category/Gown'>Gown</Link></li>
          <li key="category3"><Link to='/category/Blouse'>Blouse</Link></li>
          <li key="category4"><Link to='/category/Skirt'>Skirt</Link></li>
        </ul>
      </aside>
     
      <main className ='main'>
        <div className='content'>
          <Route path='/product/:id' component={ProductScreen}/>
          <Route path='/signin' component={SigninScreen}/>
          <Route path='/register' component={RegisterScreen}/>
          <Route path='/cart/:id?' component={CartScreen}/>
          <Route path="/category/:id" component={HomeScreen} />
          <Route path='/' exact component={HomeScreen}/>
          <Route path = "/orderConfirmation" component = {OrderConfirmation}/>
          
        </div>
        
        </main>

    <footer className='footer'>All right reserved</footer>
    </div>
    </AppContext.Provider>
  );
}

export default App;