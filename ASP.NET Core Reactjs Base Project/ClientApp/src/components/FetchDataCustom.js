//import React, { Component } from 'react';
//import { useState, useEffect } from "react";

//export class FetchData extends Component {
//  static displayName = FetchData.name;

//  constructor(props) {
//      super(props);
//      this.handleChange = this.handleChange.bind(this);
//      this.state = { forecasts: [], loading: true };
//  }

//  componentDidMount() {
//    this.populateWeatherData();
//  }

//    async handleChange() {
//        // Update component state whenever the data source changes
//        const response = await fetch('weatherforecast');
//        const data = await response.json();
//        this.setState({ forecasts: data, loading: false });
//    }

//  static renderForecastsTable(forecasts) {
//      return (
//          <div>
//              <button onClick={() => this.populateWeatherData()}>Refresh</button>
//              <table className="table table-striped" aria-labelledby="tableLabel">
//                  <thead>
//                      <tr>
//                          <th>Date</th>
//                          <th>Temp. (C)</th>
//                          <th>Temp. (F)</th>
//                          <th>Summary</th>
//                      </tr>
//                  </thead>
//                  <tbody>
//                      {forecasts.map(forecast =>
//                          <tr key={forecast.date}>
//                              <td>{forecast.date}</td>
//                              <td>{forecast.temperatureC}</td>
//                              <td>{forecast.temperatureF}</td>
//                              <td>{forecast.summary}</td>
//                          </tr>
//                      )}
//                  </tbody>
//              </table>
//          </div>

//    );
//  }

//  render() {
//    let contents = this.state.loading
//      ? <p><em>Loading...</em></p>
//      : FetchData.renderForecastsTable(this.state.forecasts);

//    return (
//      <div>
//        <h1 id="tableLabel">Weather forecast</h1>
//        <p>This component demonstrates fetching data from the server.</p>
//        {contents}
//      </div>
//    );
//  }

//  async populateWeatherData() {
//    const response = await fetch('weatherforecast');
//    const data = await response.json();
//    this.setState({ forecasts: data, loading: false });
//  }
//}





import React from "react";
import useDataFetching from "./useDataFetching";
import { useState, useEffect } from "react";

const FetchDataCustom = () => {
    const [dataSource, setDataSource] = useState("");
    const { loading, results, error } = useDataFetching(
        "weatherforecast"   // royderks, https://api.github.com/users/entykey/repos,
    );


    if (loading || error) {
        return loading ? "Loading..." : error.message;
    }


    return (
        <ul>
            {/*<table className="table table-striped" aria-labelledby="tableLabel">*/}
            {/*    <thead>*/}
            {/*        <tr>*/}
            {/*            <th>id</th>*/}
            {/*            <th>name</th>*/}
            {/*            <th>full_name</th>*/}
            {/*            <th>owner.login</th>*/}
            {/*            <th>description</th>*/}
            {/*        </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*        {results.map(res =>*/}
            {/*            <tr key={res.id}>*/}
            {/*                <td>{res.id}</td>*/}
            {/*                <td>{res.name}</td>*/}
            {/*                <td>{res.full_name}</td>*/}
            {/*                <td>{res.owner.login}</td>*/}
            {/*                <td>{res.description}</td>*/}
            {/*            </tr>*/}
            {/*        )}*/}
            {/*    </tbody>*/}
            {/*</table>*/}

            {/*<button onClick={() => this.populateWeatherData}>Refresh</button>*/}
            {/*{results.map(({ id, html_url, full_name, temperatureC }) => (*/}
            {/*    <li key={id}>*/}
            {/*        <a href={html_url} target="_blank" rel="noopener noreferrer">*/}
            {/*            {full_name}*/}
            {/*        </a>*/}
            {/*    </li>*/}
            {/*))}*/}

            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>date</th>
                        <th>temperatureC</th>
                        <th>temperatureF</th>
                        <th>summary</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map(res =>
                        <tr key={res.date}>
                            <td>{res.date}</td>
                            <td>{res.temperatureC}</td>
                            <td>{res.temperatureF}</td>
                            <td>{res.summary}</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </ul>
    );
}

export default FetchDataCustom;
