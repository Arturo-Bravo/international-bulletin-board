import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';
import ReplyNote from "./replyNote";
import CloseIcon from '@material-ui/icons/Close'

const ViewNote = () => {

	//normally here we would fetch a single note
	const [replyStatus, setStatus] = useState(0);

	useEffect(() => {

	},[])

	function openReply(){
		setStatus(1);
	}

	const navigate = useNavigate();
	function closeBox(){
		navigate('/');
	}

	//change to actual database 
	async function mydata()
	{
		const v1 = {data: "Hello", lan: "ES"};
		let v2 = {data : v1}
		console.log(v2);
		const response = await fetch('/savenote', { method: 'POST',headers:{'Content-type':"application/json"}, body: JSON.stringify(v1) });
		const body = await response.json();
		return body 
	}
	let notes = mydata();
	/*let notes = [
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
  */

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

	function mydata() {
		const v1 = {data: document.getElementById("data").innerHTML, lan: "ES"};
		let v2 = {data : v1}
		console.log(v2);
		const response = await fetch('/translate', { method: 'POST',headers:{'Content-type':"application/json"}, body: JSON.stringify(v1) });
		const body = await response.json();
		return body 
	  };

	//If it is replying
	if(replyStatus === 1){
		return(
			<div className="h-100 w-100 backdrop">
				<div className="d-flex align-items-center justify-content-around row h-75 w-100">
					<div className="mb-2 col-md-5 col-10 slide-in-right">
						<div id="noteView" className="bg-success p-4">
							<button className="close" onClick={closeBox}>
								<CloseIcon />
							</button>
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
						</div>
					</div>

					<div className="col-md-5 col-10">
						<ReplyNote cancel={setStatus}/>
					</div>
				</div>
			</div>
		)
	}


	return(
		<div className="backdrop h-100 w-100">
		<div id="parentForm" className="d-flex align-items-center justify-content-start col-lg-6 col-md-8 col-10 h-75">
			<div id="noteView" className="bg-success p-5">
				<button className="close" onClick={closeBox}>
					<CloseIcon />
				</button>
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
				
			</div>
		</div>
		</div>
	);
};

export default ViewNote;