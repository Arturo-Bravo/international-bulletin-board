import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useEffect, useState } from "react";
import NewNote from "./Components/newNote";
import ViewNote from "./Components/viewNote";

const Main = (argument1, argument2) => {
	const [notes, setNotes] = useState([]);
	useEffect(() => {
		allNotes();
	}, []);

	async function allNotes() {
		const response = await fetch("/getall", {
		  method: "GET",
		  headers: { "Content-type": "application/json" }
		});
		const body = await response.json();
		console.log(body);
		// return body;
		setNotes(body);
	  }

	return(
		<div>
			<header >
				<h1 className="my-2 text-center">Notes From Around the World</h1>
			</header>
			<Router>
			<div className="container-fluid">
				<div id="notesBox" className="row justify-content-center">
					<div className="col-10">
						{notes.map((note, index) => (
							<Link 
								to={{
									pathname:`/view-note/${note.note_id}`, 
								}}
							>
								<div className="note m-2 shadow p-2"> {note.message} </div>
							</Link>
						))}
					</div>
				</div>
			</div>
			<footer className="d-flex justify-content-around">
				<Link 
					to={ '/new-note' }
					// state={{ fromMain: change }}
				>
					<button>New Note</button>
				</Link>
				<button>View Random</button>
			</footer>
			
			
				<Routes>
						<Route path="/new-note" element={<NewNote/>}/>
						<Route path="/view-note/:noteId" element={<ViewNote/>}/>
				</Routes>
			</Router>
		</div>

	)
}

export default Main;
