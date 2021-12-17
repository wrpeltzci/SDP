import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import configureStore, { history } from './redux/store';
import { ThemeProvider } from '@mui/material';

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

import theme from './theme';
import Forgot from './pages/Forgot';
import Signout from './pages/Signout';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Signup from './pages/Signup';
import Business from './pages/Business';
import Templates from './pages/Templates';
import Profile from './pages/Profile';

export const store = configureStore();

const App = () => {
  return (
    <>
      <div className="App container">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <React.StrictMode>
              <ThemeProvider theme={theme}>
                <Router>
                  <Switch>
                    <Route exact path={'/'} component={Home} />
                    <ProtectedRoute exact path={'/dashboard'} component={Dashboard} />
                    <Route path={'/about'} component={About} />
                    <Route path={'/contact'} component={Contact} />
                    <Route path={'/demo'} component={Demo} />
                    <Route path={'/forgot'} component={Forgot} />
                    <Route path={'/login'} component={Login} />
                    <Route path={'/printpdf'} component={Printpdf} />
                    <Route path={'/print'} component={ExportPdfComponent} />
                    <Route path={'/profile'} component={Profile} />
                    <Route path={'/business'} component={Business} />
                    <Route path={'/templates'} component={Templates} />
                    <Route path={'/privacy'} component={Privacy} />
                    <Route path={'/services'} component={Services} />
                    <Route path={'/signout'} component={Signout} />
                    <Route path={'/signup'} component={Signup} />
                    <Route path={'/terms'} component={Terms} />
                  </Switch>
                </Router>
              </ThemeProvider>
            </React.StrictMode>
          </ConnectedRouter>
        </Provider>
      </div>
    </>
  )
}

export default App;
