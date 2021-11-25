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
import {ChatEngine} from 'react-chat-engine';
import ChatFeed  from './components/ChatFeed/ChatFeed';

import { useStateValue } from './StateProvider';

function App() {

  const routepaths = [" ","home", "services", "seek"];
  const history = useHistory();

  const [{ userCredentials }, dispatch] = useStateValue();

  const [authenticated, setauthenticated] = useState(false);


  const checkAuthentication = () => {
    console.log(userCredentials);
    setauthenticated(userCredentials.loggedIn);
  }

  useEffect(() => {
    
    checkAuthentication();

    return () => {
      
    }
  }, [userCredentials])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={["/", "/home"]} render={() => (
            <React.Fragment>
              <Heropane component={<Content />} />
              <Footer />
            </React.Fragment>
          )}>
          </Route>

          <Route path="/services" render={() => (
            <Layout showLogin={!authenticated} component={<Content />} />
          )}>
          </Route>

          <Route path="/seek" render={() => (
            <Layout component={<ServiceProvider />} />
          )}>
          </Route>
          <Route exact path="/chat" render={() => (
            <Layout component={<ChatEngine
              height="100vh"
              projectID="4fdaabe1-eb81-452a-b540-34f5c8c56f37"
              userName="TestUser1"
              userSecret="asdasd"
              renderChatFeed={(chatAppProps)=><ChatFeed {...chatAppProps}/>} />} />
          )}/>

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
