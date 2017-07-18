import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import device from './Device.js';
import Dashboard from './Dashboard.js';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Button from 'react-md/lib/Buttons';
import NavigationDrawer from 'react-md/lib/NavigationDrawers';
import NavLink from './NavLink.js';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

class App extends Component {
  state = {
    devices: [],
    loading: true
  }
  componentDidMount() {
    this.loadConnected();
  }

  loadConnected () {
    return fetch('http://localhost:1337/devices')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ loading: false });
        if(data.devices)
          this.setState({ devices: data.devices });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  getNavItems() {
    let navItems = [{
      exact: true,
      label: 'Dashboard',
      to: '/',
      icon: 'apps'
    }]

    let deviceItems = this.state.devices.map(device => {
      return {
        exact: true,
        label: 'Device' + ' #' + device.id,
        to: '/devices/' + device.id,
        icon: 'developer_board'
      }
    })

    return navItems.concat(deviceItems);
  }


  render() {
    const {devices, loading} = this.state

    const navItems = this.getNavItems()

    return (
      <div className="md-grid app-container">
      {loading
        ? <CircularProgress scale={2}/>
        :
        <Route
        render={({ location }) => (

        <NavigationDrawer
          drawerTitle="Test"
          toolbarTitle="Test React App"
          contentClassName="md-grid"
          drawerType="clipped"
          navItems={navItems.map(props => <NavLink {...props} key={props.to} />)}
        >
          <Switch key={location.key}>
            <Route exact path="/" location={location} component={Dashboard} />
            <Route exact path="/devices" location={location} component={Dashboard} />
            <Route path="/devices/:deviceId" location={location} component={device} />
          </Switch>
        {/*<Router>
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
        */}
        </NavigationDrawer>
      )}/>}
      </div>
    );
  }
}

export default App;
