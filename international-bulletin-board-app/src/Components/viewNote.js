import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from 'react-select';
import ReplyNote from "./replyNote";

const ViewNote = () => {

	//normally here we would fetch a single note
	const [replyStatus, setStatus] = useState(0);

	useEffect(() => {

	},[])

	function openReply(){
		setStatus(1);
	}


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

	const location = useLocation();
	let noteId = location.pathname.replace('/view-note/', '')
	let note;
	for(let i = 0; i<notes.length; i++){
		if(notes[i].id === noteId){
			note = notes[i];
			break
		}
	}

	const langs = [
	{value: 'en', label: 'English'},
	{value: 'sp', label: 'Spanish'},
	{value: 'rs', label: 'Russian'},
	]

	const langChange = option => {
		console.log(option)
		//can access option.value and option.label
		//value should be the one we need for the argument to pass to DeepL
	}

	return(
		<div id="parentForm" className="d-flex align-items-center justify-content-start col-lg-6 col-md-8 col-10">
			<div id="noteForm" className="bg-success p-5">
				<h1> {note.text} </h1>
				<p>Detected Language: Spanish?</p>
				<div className="d-flex justify-content-between align-items-center">
					<label htmlFor="language">Display Language: </label>
					<Select  
						id="selectColor"
						options={langs}
						className="select-color"
						theme={(theme, state) => ({
							...theme,
							colors: {
								...theme.colors,
								primary25: "gray", //highlight
								neutral0: "white",	//background color
								neutral80:"black"	//selected text color
							}
						})}
						onChange={langChange}
					/>
				</div>

				<p className="text-warning my-2">This is where the main body text will be. A note would have a title and body</p>

				<div className="d-flex justify-content-between">
					<button onClick={openReply}>Reply</button>
					<button>View Replies(12)</button>
				</div>
				{(replyStatus === 1) &&
					<ReplyNote/>
				}
			</div>
		</div>
	);
};

export default ViewNote;