import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NewNote from "./Components/newNote";
import ViewNote from "./Components/viewNote";

const Main = (argument1, argument2) => {
	const [randomIndex, setRandom] = useState(0);
	const [notes, setNotes] = useState([]);
	useEffect(() => {
		allNotes();
		//setRandom(Math.floor(Math.random() * notes.length))	
	}, []);
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

	async function allNotes() {
		const response = await fetch("/getall", {
		  method: "GET",
		  headers: { "Content-type": "application/json" }
		});
		const body = await response.json();
		console.log("This is the data", body);
		setNotes(body);
	  }


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
  let upperLimit = 0.9;
  let lowerLimit = 0.1;
  for (let i = 0; i < notes.length; i++) {
    x = (Math.random() * (upperLimit - lowerLimit) + lowerLimit) * 100;
    y = range[i] * 25;
    rngesus.push({ x, y });
  }

	function randomRoute(){
		setRandom(Math.floor(Math.random() * notes.length))
	}
	console.log("Notes -->",notes);
	return(
		<div>
			<header >
				<h1 className="my-2 text-center">Notes From Around the World</h1>
			</header>
			<Router>
			<div className="container-fluid">
				<div id="notesBox" className="row justify-content-center">
					<div id="board" className="col-10">
						{notes.map((note, index) => (
							<Link 
								to={{
									pathname:`/view-note/${note.note_id}`, 
								}}
								key={index}
							>
								<div className="note m-2 p-2"
									style={{
										position: "relative",
										left: `${rngesus[index].x}%`,
										top: `${rngesus[index].y}px`
									}}
								>
								{note.message} 
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
			<footer className="d-flex justify-content-around mt-2">
				<Link 
					to={ '/new-note' }
					// state={{ fromMain: change }}
				>
					<button>New Note</button>
				</Link>
				{
				<Link to={`/view-note/`}>
				<button onClick={randomRoute}>View Random</button>
				</Link>
				}
			</footer>
        <Routes>
          <Route path="/new-note" element={<NewNote />} />
          <Route path="/view-note/:noteId" element={<ViewNote />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
