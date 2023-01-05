import React, { Component } from 'react';

export default class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = { forecasts: [], loading: true };
  }

  componentDidMount() {
    this.populateWeatherData();
  }

    async handleChange() {
        // Update component state whenever the data source changes
        const response = await fetch('weatherforecast');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }

  static renderForecastsTable(forecasts) {
      return (
          <div>
              <button onClick={() => this.populateWeatherData()}>Refresh</button>
              <table className="table table-striped" aria-labelledby="tableLabel">
                  <thead>
                      <tr>
                          <th>Date</th>
                          <th>Temp. (C)</th>
                          <th>Temp. (F)</th>
                          <th>Summary</th>
                      </tr>
                  </thead>
                  <tbody>
                      {forecasts.map(forecast =>
                          <tr key={forecast.date}>
                              <td>{forecast.date}</td>
                              <td>{forecast.temperatureC}</td>
                              <td>{forecast.temperatureF}</td>
                              <td>{forecast.summary}</td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>

    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1 id="tableLabel">Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}