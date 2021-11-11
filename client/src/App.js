import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Content from './components/layout/Content';
import MenuBar from './components/layout/MenuBar';
import Footer from './components/layout/Footer';
import React, { useEffect } from 'react';
import Layout from './components/layout/Layout';
import { useHistory, useLocation } from 'react-router';
import ServiceProvider from './components/layout/ServiceProvider';
import Header from './components/layout/Header';
import ErrorComponent from './components/utilities/ErrorComponent';


function App() {

  const routepaths = ["home", "services", "seek"];
  const history = useHistory();

  useEffect(() => {

    if (routepaths.includes(window.location.href.split()[3])) {
      history.push({
        pathname: "/"
      });
    }

  }, [window.location.href])

  return (
    <div className="App">

      <Router>
        <Switch>
          <Route exact path="/home" render={() => (
            <React.Fragment>
              <MenuBar component={<Content />} />
              <Footer />
            </React.Fragment>
          )}>
          </Route>

          <Route path="/services" render={() => (
            <Layout component={<Content />} />
          )}>
          </Route>

          <Route path="/seek" render={() => (
            <Layout component={<ServiceProvider />} />
          )}>
          </Route>

          <Route path="/" render={() => (
            <>
              <Header hideSide={true} />
              <ErrorComponent />
            </>
          )}>

          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
