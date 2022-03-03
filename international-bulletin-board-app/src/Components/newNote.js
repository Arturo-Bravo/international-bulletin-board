import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Select from 'react-select';
import CloseIcon from '@material-ui/icons/Close'

function NewNote()  {

	useEffect(() => {

	}, [])
	const [noteText, setNote] = useState("");
	async function newNote() {
		let v1 = { data: noteText, color: document.getElementById("selectColor").innerText, lan: "spanish" };
		const response = await fetch("/savenote", {
		  method: "POST",
		  headers: { "Content-type": "application/json" },
		  body: JSON.stringify(v1),
		});
	  }
	//Set Colors here in value
	const options = [
		{ value: '#feff9c', label: 'Yellow'},
		{ value: '#ff7eb9', label: 'Pink'},
		{ value: '#99FFFF', label: 'Blue'},
	]
	const customStyles= {
		option: (provided, state) => ({
			...provided,
			borderBottom: '1px solid rgb(184, 184, 184)',
			color: state.value,
		}),
	}

	const handleColorChange = color =>{
		let note = document.getElementById('noteForm');
		note.style.backgroundColor = color.value;
	}
	
	const navigate = useNavigate();
	function closeBox(){
		navigate('/');
	}
	const noteCreate = (event) => {
		event.preventDefault();
		newNote();
		navigate('/');
		window.location.reload();
	};

	return(
		<div className="backdrop">
		<div id="parentForm" className="d-flex align-items-center justify-content-center col-lg-6 col-md-8 col-10 h-75">
			<div id="noteForm" className="p-4 col-12">
				<button className="close" onClick={closeBox}>
					<CloseIcon />
				</button>
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
							styles={customStyles}
							theme={(theme, state) => ({
								...theme,
								colors: {
									...theme.colors,
									primary25: "gray", //highlight
									neutral0: "rgb(48, 48, 48)",	//background color
									neutral80:"white"	//selected text color
								}
							})}
							onChange={handleColorChange}
						/>
					</div>
					<textarea 
						aria-label="text" 
						name="text"
						className="mt-2" 
						id="noteText"
						onChange={(e) => setNote(e.target.value)}
					></textarea>
					<input type="submit" className="mt-4" value={'Submit'} />
				</form>
			</div>
		</div>
		</div>
	)
};

export default NewNote;