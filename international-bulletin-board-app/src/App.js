import './App.css';
import Main from './main.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import NewNote from './newNote';
import ViewNote from './viewNote';

function App() {
  return (
    <div className="App">
      <Main/> 
    </div>
  );
}

export default App;
