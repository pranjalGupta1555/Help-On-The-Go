import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Content from './components/layout/Content/Content';
import Heropane from './components/layout/Heropane/HeroPane';
import Footer from './components/layout/Footer/Footer';
import React, { useEffect, useState } from 'react';
import Layout from './components/layout/Layout';
import { useHistory, useLocation } from 'react-router';
import ServiceProvider from './components/ServiceProvider/ServiceProvider';
import Header from './components/layout/Header/Header';
import ErrorComponent from './components/utilities/ErrorComponent';
import { useStateValue } from './StateProvider';

function App() {

  const routepaths = [" ", "home", "services", "seek"];

  const history = useHistory();

  const [{ userCredentials }, dispatch] = useStateValue();

  const [authenticated, setauthenticated] = useState(false);


  const checkAuthentication = () => {
    console.log(userCredentials, "*****");
    setauthenticated(userCredentials.loggedIn);
  }



  console.log("LOGGED IN ::: ", userCredentials.loggedIn);
  useEffect(() => {
    
    checkAuthentication();

    checkAuthentication();

  }, [authenticated])


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={["/", "/home"]} render={() => (
            <Layout showLogin={!authenticated} hero={true} component={<Content />}>
            </Layout>

          )}>
          </Route>

          <Route path="/services" render={() => (
            <Layout showLogin={!authenticated} component={<Content />} />
          )}>
          </Route>

          <Route path="/seek" render={() => (
            <Layout showLogin={!authenticated} component={<ServiceProvider />} />
          )}>
          </Route>

          <Route path="/err" render={() => (
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
