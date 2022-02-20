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
		{ value: 'red', label: 'Red'},
		{ value: 'purple', label: 'Purple'},
	]
	
	const navigate = useNavigate();

	const noteCreate = (event) => {
		event.preventDefault();
		console.log(noteText);
		navigate('/');
	};

	return(
		<div id="noteForm" className="d-flex align-items-center justify-content-center col-lg-6 col-md-8 col-10">
			<div className="p-4">
				<h1>New Note</h1>
				<form onSubmit={noteCreate} className="" >
					<div className="form-group d-flex justify-content-between align-items-center">
						<label className="select-color" htmlFor="color">Select Color:</label>
						{/* documentation: https://react-select.com/home 
						Also making the parent div a row or a class container messes with the width of the options
						so do not make it a row or contatiner*/}
						<Select  
							id="selectColor"
							options={options}
							className="select-color"
						/>
					</div>
					<textarea 
						aria-label="text" 
						name="text"
						className="mt-2" 
						id="noteText"
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