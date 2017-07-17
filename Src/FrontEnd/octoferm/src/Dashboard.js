import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Button from 'react-md/lib/Buttons';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import './Dashboard.css';


class Dashboard extends Component {
  state = {
    devices: null,
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
        this.setState({ devices: data.devices });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    const {devices, loading} = this.state
    return (
      <div>
        {loading ?
            <CircularProgress scale={2}/>
          :
            <div className='md-grid'>
              {devices ? devices.map(function(device, i){
                return <Card className="md-cell md-cell--4">
                  <CardTitle title={'Device #' + device.id}
                    subtitle={device.name + ' - ' + device.address}/>

                  <CardText>
                    <Link to={'/device/' + device.id}>{device.name}
                      - {device.address}</Link>
                  </CardText>

                  <CardActions>
                    <Link to={'/device/' + device.id}>
                      <Button flat label="Logs"></Button>
                    </Link>
                    <Button flat label="Settings" />
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
