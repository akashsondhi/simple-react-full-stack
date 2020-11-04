import React, { Component, useState } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { primeMedian: null };
    this.handleChange = this.handleChange.bind(this);
    this.fetchPrimeMedian = this.fetchPrimeMedian.bind(this);
  }

  // Function to handle input field changes
  handleChange(event) {
    this.setState({ primeLimit: event.target.value });
  }

  // Function to make api call to get the required result
  fetchPrimeMedian(event) {
    event.preventDefault();
    fetch("/api/findPrimeMedian?primeLimit=" + this.state.primeLimit)
      .then(res => res.json())
      .then(data =>
        this.setState({ primeMedian: data.median, error: data.error })
      );
  }

  render() {
    const { primeMedian, error } = this.state;
    return (
      <div className="jumbotron">
        <form>
          <div className="row">
            <div className="col text-right">
              <label htmlFor="primeLimit">Enter the Prime Number Limit </label>
            </div>

            <div className="col">
              <input
                type="text"
                id="primeLimit"
                className="form-control"
                onChange={this.handleChange}
                autoComplete="off"
              />
              {this.state.error && (
                <div className="alert alert-warning" role="alert">
                  {error}
                </div>
              )}
              {this.state.primeMedian && (
                <div className="alert alert-success" role="alert">
                  Result: {primeMedian}
                </div>
              )}
            </div>
            <div className="col">
              <div className="btn-group" role="group" aria-label="Actions">
                <button
                  onClick={this.fetchPrimeMedian}
                  className="btn btn-primary"
                >
                  Find Prime Median
                </button>
                <button onClick={this.resetPage} className="btn btn-secondary">
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
