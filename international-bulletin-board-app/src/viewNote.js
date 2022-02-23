import { useLocation } from "react-router-dom";

const ViewNote = () => {
	//const location = useLocation();
	//normally here we would fetch a single note
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
	console.log(location)

	let noteId = location.pathname.replace('/view-note/', '')
	let note;
	for(let i = 0; i<notes.length; i++){
		if(notes[i].id === noteId){
			note = notes[i];
			break
		}
	}

	return(
		<div>
			VIEW NOTE
			<h1> {note.text} </h1>
		</div>
	);
};

export default ViewNote;