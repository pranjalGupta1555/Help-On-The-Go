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
import {ChatEngine} from 'react-chat-engine';
import ChatFeed from './components/ChatFeed/ChatFeed/ChatFeed';
import Header from './components/layout/Header/Header';
import ErrorComponent from './components/utilities/ErrorComponent';
import { useStateValue } from './Store/StateProvider';
import Join from './components/Administration/Join/Join';
import UserProfile from './components/UserProfile/UserProfile';


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
            <Layout showLogin={authenticated} hero={true} component={<Content />}>
            </Layout>
          )}>
          </Route>

          <Route path="/services" render={() => (
            <Layout showLogin={authenticated} component={<Content />} />
          )}>
          </Route>

          <Route path="/userprofile" render={() => (
            <Layout showLogin={!authenticated} component={<UserProfile />} />
          )}>
          </Route>

          <Route path="/seek" render={() => (
            <Layout showLogin={authenticated} component={<Seek />} />
          )}>
          </Route>

          <Route path="/join" render={() => (
            <Layout showLogin={authenticated} component={<Join />} />
          )}>
          </Route>
          <Route exact path="/chat" render={() => (
            <Layout component={userCredentials.loggedIn?<ChatEngine
              height="100vh"
              projectID="4fdaabe1-eb81-452a-b540-34f5c8c56f37"
              userName={userCredentials.userDetails.username}  //"TestUser1"
              userSecret={userCredentials.userDetails.password} //"Node@112233"
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
