import './App.css';
import Main from './main.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import NewNote from './newNote';

function App() {
  return (
    <div className="App">
      
      <Router>
				<Routes>
            <Route path="/" element={<Main/>} />
						<Route path="/new-note" element={<NewNote/>}/>
				</Routes>
			</Router> 
    </div>
  );
}

export default App;

