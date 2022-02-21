import React, {Component} from "react";
import axios from "axios"

export default class Main extends Component{

//We can pass data through components like so
constructor() {
	super();
	this.state = {
		data : "nothing yet",
		notes : [
			'Today was a good day in Oregon',
			'Saludos de Michoacan',
			'Сегодня моя машина взорвалась'
		]
	};
}
componentDidMount() {
    this.mydata()
      .then(res => this.setState({ data: res.message }))
      .catch(err => console.log(err));
  }

  mydata = async () => {
    const response = await fetch('/backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
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
			<h1>data from backend is: {this.state.data}</h1>
		</div>

	)
	}
}