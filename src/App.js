import React from 'react';
import rp from 'request-promise';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        rp('/test')// didnt work, need to configure routing through proxy (or switch to axios)
            .then((results) => {
                console.log(`Success: ${results}`)
            })
            .catch(err => {
                console.log(`Error: ${err}`)
            });

        fetch('/test')
            .then(response => response.json()) // Apparently you need to parse the wierd response
            .then(res => {
                console.log(`Fetch: ${JSON.stringify(res)}`);
            })
  }

  render () {
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
    );
  }
}

export default App;
