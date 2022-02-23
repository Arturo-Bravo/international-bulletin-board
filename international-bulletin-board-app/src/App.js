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
      
      <Router>
				<Routes>
            <Route exact path="/" element={<Main/>} />
						<Route exact path="/new-note" element={<NewNote/>}/>
						<Route path="/view-note/:noteId" element={<ViewNote/>}/>

				</Routes>
			</Router> 
    </div>
  );
}

export default App;
