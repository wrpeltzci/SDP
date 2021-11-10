import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ExportPdfComponent from "./templates/export-pdf.component";
import Appbar from './components/Appbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Printpdf from './pages/Dashboard/Printpdf';

const App = () => {
  return (
    <>
      <Appbar title="Print your docs" />
      <div className="App container">
        <Router>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route path={'/dashboard'} component={Dashboard} />
            <Route path={'/printpdf'} component={Printpdf} />
            <Route path={'/print'} component={ExportPdfComponent} />
          </Switch>
        </Router>
      </div>
      <Appbar title="Footer" style={{ bottom: 0, marginTop: 'calc(5% + 220px)' }} />
    </>
  )
}

export default App;
