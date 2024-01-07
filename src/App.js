import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Wallet from './components/Wallet';
import Transactions from './components/Transactions';
import { AppStateProvider } from './store/AppContext';
function App() {
    return (
    <AppStateProvider>  
      <Router>
          <div className="container">
            <nav className="nav nav-tabs">
            <ul style={{listStyleType: "none", padding: 0}} className="nav-item">
              <li style={{display: "inline", float: 'left'}}><Link to={'/'} className="nav-link"> Wallet </Link></li>
              <li style={{display: "inline", float: 'left'}}><Link to={'/transactions'} className="nav-link">Transactions</Link></li>
            </ul>
            </nav>
    
            <Routes>
                <Route exact path='/' element={<Wallet/>} />
                <Route path='/transactions' element={<Transactions/>} />
            </Routes>
          </div>
        </Router>
      </AppStateProvider>
    );
}

export default App;