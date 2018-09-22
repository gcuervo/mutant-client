import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let dna = JSON.parse(this.state.value);
    //["ATGCGA", "CAGTGC", "TTATGT", "AGAAGG", "CCCCTA", "TCACTG"]
    fetch('http://localhost:8090/mutant', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dna: dna
      })
    }).then(res => res.json())
      .then(res => console.log(res));

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className="row">
          <div className="col-lg-5 col-centered col-lg-offset-4">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <button className="btn btn-outline-secondary" onClick={this.handleSubmit} type="button">Send</button>
              </div>
              <input type="text" className="form-control" placeholder="Insert DNA" value={this.state.value} onChange={this.handleChange} aria-describedby="basic-addon1" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
