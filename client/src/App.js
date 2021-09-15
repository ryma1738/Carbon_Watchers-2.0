import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navigator from './components/Nav';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import './index.css';

function App() {
  return (
    <Router >
      <>
        <Navigator />
        <Switch>
          <Route exact path='/' component={Landing} />
        </Switch>
        <Footer />
      </>
    </Router>
  );
}

export default App;
