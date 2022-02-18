import { useCallback, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Select from 'react-select';

function NewNote()  {
	useEffect(() => {
		console.log('Hello')
		let back = document.getElementById('root');
		back.classList.add('backdrop');

	}, [])

	//Form variables
	const [noteText, setNote] = useState("");
	const options = [
		{ value: 'yellow', label: 'Yellow'},
		{ value: 'red', label: 'red'},
		{ value: 'purple', label: 'purple'},
	]
	
	const navigate = useNavigate();
	//WIP TODO this sends you back to main but it has a bug, and the form doesn't get submitted
	const handleClick = () => {
	}

	const noteCreate = (event) => {
		event.preventDefault();
		console.log(noteText);
		navigate('/');
	};

	return(
		<div id="noteForm" className="d-flex align-items-center justify-content-center">
			<div className="p-4">
			New Note
			<form onSubmit={noteCreate}>
				<label htmlFor="color">Select Color:</label>
				<Select options={options}/>
				<textarea 
					aria-label="text" 
					name="text"
					className="form-control mt-2" 
					id="text" cols="30" rows="10"
					// value={this.noteText} for some reason this does not work idk why
					onChange={(e) => setNote(e.target.value)}
				></textarea>
				<input type="submit" className="mt-4" value={'Submit'} />
			</form>
			</div>
		</div>
	)
};

export default NewNote;