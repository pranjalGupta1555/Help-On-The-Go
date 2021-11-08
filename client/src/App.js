import logo from './logo.svg';
import './App.css';
import Content from './components/layout/Content';
import MenuBar from './components/layout/MenuBar';

function App() {
  return (
    <div className="App">
      <MenuBar/>
      <Content/>
    </div>
  );
}

export default App;
