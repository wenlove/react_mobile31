import React, { Component, Fragment } from 'react';
import './styles/App.css';
import Mylayout from './components/Mylayout';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Mine from './pages/Mine';
import { HashRouter as Router, Route } from 'react-router-dom';
import GoodsDetail from './pages/GoodsDetail';

class App extends Component {
  state = {}
  render() {
    return (
      <Fragment>
        <Router>
          <Route path="/" exact render={(props) => <Mylayout {...props}><Home /></Mylayout>} />
          <Route path="/Cart" render={(props) => <Mylayout {...props}><Cart /></Mylayout>} />
          <Route path="/Mine" render={(props) => <Mylayout {...props}><Mine /></Mylayout>} />
          <Route path="/GoodsDetail/:id" component={GoodsDetail} />
        </Router>
      </Fragment>
    );
  }
}

export default App;
