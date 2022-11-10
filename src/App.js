import logo from './bk_logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        {/* <img src={logo} className="BK-logo" alt="logo" />
        <div>
          BKU
        </div> */}


        <div id="container" style={{whiteSpace:'nowrap'}}>
          <div id="image" style={{display:'inline'}} align="left">
              <img src={logo} className="BK-logo" alt="logo" />
          </div>
          <div id="texts" style={{display:'inline', whiteSpace:'nowrap'}}> 
              BKU
          </div>
        </div>


      </header>
    </div>


  );
}

export default App;
