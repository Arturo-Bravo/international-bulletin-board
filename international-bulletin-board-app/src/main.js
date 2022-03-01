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
//We can pass data through components like so

	//view width dimensions https://stackoverflow.com/a/8876069
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

	const [randomIndex, setRandom] = useState(0);
	useEffect(() => {
		setRandom(Math.floor(Math.random() * notes.length))	

	//THIS IS WHERE DATA WILL BE FETCHED FROM BACKEND
	})

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

	let rngesus = [];
	//generate range of notes
	let range = [...notes.keys()];
	//Durstenfeld shuffle https://stackoverflow.com/a/12646864
	function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
	}
	shuffleArray(range);
	let x = 0;
	let y = 0;
	let upperLimit = vw - (vw*.20)
	let lowerLimit = 0 + (vw*.20)
	for(let i=0; i< notes.length; i++){
		x = Math.random() * (upperLimit - lowerLimit) + lowerLimit;
		y = (range[i] * 25) + 100;
		rngesus.push({x, y})
	}

	function randomRoute(){
		setRandom(Math.floor(Math.random() * notes.length))
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
									pathname:`/view-note/${note.id}`, 
								}}
								key={index}
							>
								<div className="note m-2 shadow p-2"
									style={{
										position: "absolute",
										left: `${rngesus[index].x}px`,
										top: `${rngesus[index].y}px`
									}}
								> {note.text} </div>
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
				{
				<Link
					to={ `/view-note/${notes[randomIndex].id}` }
				>
				<button onClick={randomRoute}>View Random</button>
				</Link>
				}
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
