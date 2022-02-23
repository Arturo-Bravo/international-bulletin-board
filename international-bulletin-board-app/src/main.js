import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useEffect } from "react";

import NewNote from "./newNote";
import App from "./App";

const Main = (argument1, argument2) => {
//We can pass data through components like so
useEffect(() => {
	let root = document.getElementById('root');
	root.className='';

	//THIS IS WHERE DATA WILL BE FETCHED FROM BACKEND
}, [])

	let notes = [
		{
			text: 'Today was a good day in Oregon',
			id: '123456'
		},
		{
			text: 'Saludos de Michoacan',
			id: '999999'
		},
		{
			text: 'Сегодня моя машина взорвалась',
			id: '111111'
		}
  ]

	return(
		<div>
			<header >
				<h1 className="my-2">Notes From Around the World</h1>
			</header>
			<div className="container-fluid">
				<div id="notesBox" className="row justify-content-center">
					<div className="col-10">
						{notes.map(note => (
							<Link 
								to={{
									pathname:`/view-note/${note.id}`, 
								}}
							>
								<div className="note m-2 shadow p-2"> {note.text} </div>
							</Link>
						))}
					</div>
				</div>
			</div>
			<footer className="d-flex justify-content-around">
				<a href="/new-note">
					<button>New Note</button>
				</a>
				<button>View Random</button>
			</footer>
			
		</div>

	)
}

export default Main;