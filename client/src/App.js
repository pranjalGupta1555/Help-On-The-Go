import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Content from './components/layout/Content/Content';
import React, { useEffect, useState } from 'react';
import Layout from './components/layout/Layout';
import { useHistory, useLocation } from 'react-router';
import Seek from './components/Seek/Seek';
import { ChatEngine } from 'react-chat-engine';
import ChatFeed from './components/ChatFeed/ChatFeed/ChatFeed';
import Header from './components/layout/Header/Header';
import ErrorComponent from './components/utilities/ErrorComponent';
import { useStateValue } from './Store/StateProvider';
import Join from './components/Administration/Join/Join';
import PreOrder from './components/PreviousOrders/preOrder';
import ServiceProvided from './components/ServiceProvider/ServiceProvided';
import UserProfile from './components/UserProfile/UserProfile';


function App() {

  const [{ userCredentials }, dispatch] = useStateValue();

  const [authenticated, setauthenticated] = useState(false);

  const [chatId, setChatId] = useState();


  const checkAuthentication = () => {
    setauthenticated(userCredentials.loggedIn);
  }


  useEffect(() => {

    checkAuthentication();

    checkAuthentication();

  }, [authenticated])


  return (
    <div className="App">
      <Router>
        <Switch>
          {/* route to the landing page */}
          <Route exact path={["/", "/home"]} render={() => (
            <Layout showLogin={authenticated} hero={true} component={<Content />}>
            </Layout>
          )}>
          </Route>
          {/* Route to services */}
          <Route path="/services" render={() => (
            <Layout showLogin={authenticated} component={<Content />} />
          )}>
          </Route>
          {/* Route to user profile */}
          <Route path="/userprofile" render={() => (
            <Layout showLogin={!authenticated} component={<UserProfile />} />
          )}>
          </Route>
          {/* Route to seekers */}
          <Route path="/seek" render={() => (
            <Layout showLogin={authenticated} component={<Seek setChatId={setChatId} userCredentials={userCredentials}/>} />
          )}>
          </Route>
          {/* Route to join */}
          <Route path="/join" render={() => (
            <Layout showLogin={authenticated} component={<Join />} />
          )}>
          </Route>
          <Route path="/serviceProvided" render={()=>(
            <Layout showLogin={authenticated} component={<ServiceProvided userDetails={userCredentials.userDetails}/>}/>
            )}></Route>

          {/* Route to chat interface */}
          <Route exact path="/chat" render={() => (
            <Layout component={userCredentials.loggedIn ? <ChatEngine
              height="100vh"
              projectID="4fdaabe1-eb81-452a-b540-34f5c8c56f37"
              userName={userCredentials.userDetails.username}  
              userSecret={userCredentials.userDetails.password}
              activeChat={chatId}
              renderChatFeed={(chatAppProps)=><ChatFeed {...chatAppProps}/>} />:<h2>User not logged in</h2>} />
          )}/>
          <Route path="/err" render={() => (
            <>
              <Header hideSide={true} />
              <ErrorComponent />
            </>
          )}>

          </Route>
          <Route path="/previousOrders" render={() => (
            <>
              <Layout showLogin={authenticated} component={<PreOrder />} />
            </>
          )} ></Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
