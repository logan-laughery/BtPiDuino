import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Button from 'react-md/lib/Buttons';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import './Dashboard.css';
import Moment from 'moment';

class Dashboard extends Component {
  state = {
    devices: null,
    loading: true
  }
  componentDidMount() {
    this.loadConnected();
  }

  loadConnected () {
    return fetch('http://localhost:1337/devices/details')
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
    const {devices, loading} = this.state
    return (
      <div className="md-cell md-cell--12">
        {loading ?
            <CircularProgress scale={2}/>
          :
            <div className='md-grid'>
              {devices ? devices.map(function(device, i){
                return <Card className="md-cell md-cell--6">
                  <CardTitle title={'Device #' + device.deviceId}
                    subtitle={device.name + ' - ' + device.address}/>
                  <hr/>
                  <CardText>
                    <div className='md-grid md-grid--no-spacing'>
                    <div className='md-cell md-cell--6'>
                      <div className="md-font-light">Current</div>
                      <div className="md-display-1">{device.actualTemperature}&#x2109;</div>
                    </div>
                    <div className='md-cell md-cell--6'>
                      <div className="md-font-light">Target</div>
                      <div className="md-display-1">{device.desiredTemperature}&#x2109;</div>
                    </div>
                    <div className='md-cell md-cell--12'>
                      <div className="md-font-light">Pump Status</div>
                      <div className="md-display-1 small">
                        {device.actualPumpState ? "On" : "Off"}
                      </div>
                    </div>
                    <div className='md-cell md-cell--12'>
                      <div className="md-font-light">Last Update</div>
                      <div className="md-display-1 small">
                        {Moment(device.lastConnected).local().format("MM/DD/YYYY, h:mm:ss a")}
                      </div>
                    </div>
                    </div>
                  </CardText>
                  <CardActions>
                    <Link to={'/devices/' + device.deviceId}>
                      <Button flat primary label="Logs"></Button>
                    </Link>
                    <Link to={'/settings/' + device.deviceId}>
                      <Button flat primary label="Settings"></Button>
                    </Link>
                  </CardActions>
                </Card>;
              }) : <p></p>}
            </div>
          }
      </div>
    );
  }
}

export default Dashboard;
