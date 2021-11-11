import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ExportPdfComponent from "./templates/export-pdf.component";

import About from './pages/About';
import Contact from './pages/Contact';
import Demo from './pages/Demo';
import Dashboard from './pages/Dashboard';
import Printpdf from './pages/Dashboard/Printpdf';
import Home from './pages/Home';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Services from './pages/Services';
import Terms from './pages/Terms';

const App = () => {
  return (
    <>
      <div className="App container">
        <Router>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route path={'/dashboard'} component={Dashboard} />
            <Route path={'/printpdf'} component={Printpdf} />
            <Route path={'/print'} component={ExportPdfComponent} />
            <Route path={'/about'} component={About} />
            <Route path={'/services'} component={Services} />
            <Route path={'/demo'} component={Demo} />
            <Route path={'/contact'} component={Contact} />
            <Route path={'/login'} component={Login} />
            <Route path={'/privacy'} component={Privacy} />
            <Route path={'/terms'} component={Terms} />
          </Switch>
        </Router>
      </div>
    </>
  )
}

export default App;
