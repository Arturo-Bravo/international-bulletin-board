
const Main = (argument1, argument2) => {
//We can pass data through components like so

	let notes = [
		'Today was a good day in Oregon',
		'Saludos de Michoacan',
		'Сегодня моя машина взорвалась'
	]

	return(
		<div>
			<header>
				<h1 className="my-2">Notes From Around the World</h1>
			</header>
			<div className="container-fluid">
				<div id="notesBox" className="row justify-content-center">
					<div className="col-10">
						{notes.map(note => (
							<div className="note m-2 shadow p-2"> {note} </div>
						))}
					</div>
				</div>
			</div>
			<footer className="d-flex justify-content-around">
				<button>New Note</button>
				<button>View Random</button>
			</footer>
		</div>

	)
}

export default Main;