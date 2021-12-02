import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Content from './components/layout/Content/Content';
import Heropane from './components/layout/Heropane/HeroPane';
import Footer from './components/layout/Footer/Footer';
import React, { useEffect, useState } from 'react';
import Layout from './components/layout/Layout';
import { useHistory, useLocation } from 'react-router';
import Seek from './components/Seek/Seek';
import ServiceProvider from './components/ServiceProvider/ServiceProvider';
import Header from './components/layout/Header/Header';
import ErrorComponent from './components/utilities/ErrorComponent';
import {ChatEngine} from 'react-chat-engine';
import ChatFeed from './components/ChatFeed/ChatFeed/ChatFeed';
import Registration from './components/Administration/Registration/Registration';
import Login from './components/Administration/Login/Login';

import { useStateValue } from './StateProvider';
import Join from './components/Administration/Join/Join';


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
            <Layout component={<Content />} />
          )}>
          </Route>

          <Route path="/seek" render={() => (
            <Layout showLogin={!authenticated} component={<Seek />} />
          )}>
          </Route>

          <Route path="/join" render={() => (
            <Layout showLogin={!authenticated} component={<Join />} />
          )}>
            
          </Route>
          <Route path="/signUp" render={() => (
            <Layout component={<Registration />} />
          )}></Route>
          <Route path="/signIn" render={() => (
            <Layout component={<Login />} />
          )}></Route>
          <Route exact path="/chat" render={() => (
            <Layout component={localStorage.getItem("username")?<ChatEngine
              height="100vh"
              projectID="4fdaabe1-eb81-452a-b540-34f5c8c56f37"
              userName="TestUser1"
              userSecret="Node@112233"
              renderChatFeed={(chatAppProps)=><ChatFeed {...chatAppProps}/>} />:<h2>User not logged in</h2>} />
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
