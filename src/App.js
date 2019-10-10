import React from 'react';
import './App.css';

import axios from './configAxios';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            names: [],
            name1: "",
            name2: ""
        };
    }

    updateNames(_response) {
        var parsedResponse = JSON.parse(JSON.stringify(_response.data));
        console.log(`DB Response: ${JSON.stringify(parsedResponse)}`);
        let updated_array = [];
        parsedResponse.forEach((data_packet) => {
            let _name = data_packet.name1 + " " + data_packet.name2;
            let _id = data_packet.id;
            updated_array = updated_array.concat([{name: _name, id: _id}]);
        });
        this.setState({names: JSON.parse(JSON.stringify(updated_array))})
    }

    componentDidMount() {
        axios.get('/')
            .then(response => this.updateNames(response))
            .catch(error => {
                console.log(`From componentDidMount: ${error}`)
            });
  }

  buttonClick(id){
        axios.post( `/delete/${id}`)
            .then(response => this.updateNames(response))
            .catch(error => console.log(`From buttonClick: ${error}`));
  }

  handleName1Change = event => {
        this.setState({
            newName1: event.target.value
        })
  };

  handleName2Change = event => {
        this.setState({
            newName2: event.target.value
        })
  };

  submitNames() { // axios in this app is having some issues with submitting through raw html, works in pure express though
      if (this.state.newName1 && this.state.newName2) {
          axios.post(`/new/${this.state.newName1}/${this.state.newName2}`)
              .then(response => this.updateNames(response))
              .catch(error => console.log(`From submitNames: ${error}`));
      } else {
          alert("Please enter values before submitting");
      }
  };

  render () {
    let names = this.state.names ? this.state.names : [];
    return (
        <div className="App">
            {names.map((name) =>
                <p>{name.name}<button onClick={() => this.buttonClick(name.id)}>Delete Me!</button></p>
            )}
            <br/>
            <input value={this.state.newName1} onChange={this.handleName1Change} type="text"/>
            <input value={this.state.newName2} onChange={this.handleName2Change} type="text"/>
            <button onClick={() => this.submitNames()}>Submit</button>
        </div>

    );
  }
}

export default App;
