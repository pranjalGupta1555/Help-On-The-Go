import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Content from './components/layout/Content';
import MenuBar from './components/layout/MenuBar';
import Footer from './components/layout/Footer';
import React from 'react';
import Layout from './components/layout/Layout';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path="/home" element={
            <React.Fragment>
              <MenuBar component={<Content/> }/>
              <Footer/>
            </React.Fragment>
          }>  
          </Route>
          
          <Route path="/services" element = {
            <Layout/>
          }>
            
          </Route>


        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
