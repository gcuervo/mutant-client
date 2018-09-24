import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      ratio: 0.0,
      human: 0,
      mutant: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getStats();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  saveDna(dna, isMutant) {
    fetch('http://localhost:8090/mutant/dna', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dna: dna,
        mutant: isMutant
      })
    }).then(res => res.json())
      .then(res => console.log(res));
  }

  getStats() {
    fetch('http://localhost:8090/mutant/stats', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
      .then(res => {
        this.setState({ value: this.state.value,
          ratio: res.ratio,
          mutant: res.count_mutant_dna,
          human: res.count_human_dna});
        console.log(res);
      });
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
      .then(res => {
        console.log(res.mutant);
        //console.log(res.mutant);
        this.saveDna(dna, res.mutant);
        this.getStats();
      });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Am i a mutant?</h1>
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

        <div className="mutant-table">
          <div className="row">
            <div className="col-lg-5 col-centered col-lg-offset-4">
              <table className="table ">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Humanos</th>
                    <th scope="col">Mutantes</th>
                    <th scope="col">Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.state.human}</td>
                    <td>{this.state.mutant}</td>
                    <td>{this.state.ratio}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
