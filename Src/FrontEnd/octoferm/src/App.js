import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import device from './Device.js';
import Dashboard from './Dashboard.js';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Button from 'react-md/lib/Buttons';


class App extends Component {
  state = {
    devices: null,
    loading: true
  }
  componentDidMount() {
    this.loadConnected();
  }

  loadConnected () {
    return fetch('http://173.31.120.214:1337/devices')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ loading: false });
        this.setState({ devices: data.devices });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    const {devices} = this.state
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <Route exact={true} path="/" component={Dashboard}/>
          <Route path="/device/:deviceId" component={device}/>
        </div>
      </Router>
    );
  }
}

export default App;
