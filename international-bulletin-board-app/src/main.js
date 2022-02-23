import React, {Component} from "react";
import axios from "axios"
import { translate } from 'deepl-api';
export default class Main extends Component{

//We can pass data through components like so
constructor() {
	super();
	this.state = {
		data : "This dont work",
		notes : [
			'Today was a good day in Oregon',
			'Saludos de Michoacan',
			'Сегодня моя машина взорвалась'
		]
	};
}

componentDidMount() {
	this.setState({data : "The big red dog"});
    this.mydata()
      .then(res => this.setState({ data: res.message }))
      .catch(err => console.log(err));
  }
  
  mydata = async () => {
	const v1 = {data: document.getElementById("data").innerHTML, lan: "ES"};
	let v2 = {data : v1}
	console.log(v2);
	const response = await fetch('/translate', { method: 'POST',headers:{'Content-type':"application/json"}, body: JSON.stringify(v1)
});
	const body = await response.json();
	return body 
  };
	
	render(){
	return(
		<div>
			<h1>Hi</h1>
			<header>
				<h1 className="my-2">Notes From Around the World</h1>
			</header>
			<div className="container-fluid">
				<div id="notesBox" className="row justify-content-center">
					<div className="col-10">
						{this.state.notes.map(note => (
							<div className="note m-2 shadow p-2"> {note} </div>
						))}
					</div>
				</div>
			</div>
			<footer className="d-flex justify-content-around">
				<button>New Note</button>
				<button>View Random</button>
			</footer>
			<p id="data">Hello I really like dogs (To Spanish)</p>
			<p id="results">This is the translation to spanish:  {this.state.data}</p>
		</div>

	)
	}
}