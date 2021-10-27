import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Contact} from './Contact';
import {Navigation} from './Navigation';

import {BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="Container">
      <h3 className="m-3 d-flex  justify-content-center">    
        Contact App
      </h3>
      <Navigation/>
      <Switch>
      <Route path='/' component={Home}exact />
      <Route path='/Contact' component={Contact} />

      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
