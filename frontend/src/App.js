import logo from './bk_logo.png';
import './App.css';
import Purchasing from "./page/Purchasing"
import OrderManagement from "./page/OrderManagement"
import About from "./page/About"

function App() {
  let component
  switch (window.location.pathname) {
    case "/":
      component = <Purchasing/>
      break;
    case "/Purchasing":
      component = <Purchasing/>
      break;
    case "/OrderManagement":
      component = <OrderManagement/>
      break;
    case "/About":
      component = <About/>
      break;
    default:
      break;
  }

  return (
    <div className="App">
      <header className="App-header">

      <div className='navbar__brand'> 
        <div className='navbar__logo'>
          <img src={logo} className="BK-logo" alt="logo" />
        </div>
        <b className="navbar__title">BKU</b>
      </div>
        
      <div className='navbar__items_bottom'>
        <a className='navbar__link' href='/Purchasing'> Purchasing</a>
        <a className='navbar__link' href='/OrderManagement'> Order Management</a>
        <a className='navbar__link' href='/About'> About</a>
      </div>

      </header>

      <div className='main-wrapper'>
        {component}
      </div>

      <footer className='App-footer'>
        <p className="App-footer_text">Copyright © 2022 Group 11</p>
      </footer>
    </div>


  );
}

export default App;
