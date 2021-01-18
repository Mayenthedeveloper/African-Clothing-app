import React,{useState} from 'react';
import  {  Route, Link } from 'react-router-dom';
// import data from './data';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';
import './App.css';
import SigninScreen from './Screens/SigninScreen';
import RegisterScreen from './Screens/RegisterScreen';
import AppContext from './AppContext'



function App() {
  const [cart, setCart] = useState([])

  const openMenu = ()=> {
    document.querySelector('.sidebar').classList.add('open');

  };

  const closeMenu = ()=> {
    document.querySelector('.sidebar').classList.remove('open');
  };

  const addToCart = (item)=>{
    setCart([...cart, item])
  }

  const value = {
    cart,
    addToCart
  }

  return (
    <AppContext.Provider value ={value}>
    <div className='grid-container'>
      <header className='header'>
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
      </header>
      <aside className='sidebar'>
        <h3>Shopping Categories</h3>
        <button className='sidebar-close-button' onClick={closeMenu}>X</button>
        <ul className='categories'>
          <li><Link to='/category/Skirt and Blouse'>Skirt and Blouse</Link></li>
          <li><Link to='/category/Gown'>Gown</Link></li>
          <li><Link to='/category/Blouse'>Blouse</Link></li>
          <li><Link to='/category/Skirt'>Skirt</Link></li>
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
          
        </div>
        
        </main>

    <footer className='footer'>All right reserved</footer>
    </div>
    </AppContext.Provider>
  );
}

export default App;