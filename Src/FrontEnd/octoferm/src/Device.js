import React, { Component } from 'react';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

class Device extends Component {
  state = {
    deviceId: null,
    device: null,
    logs: null,
    loading: true,
    status: null
  }
  componentDidMount() {
    this.setState({deviceId: this.props.match.params.deviceId});
    this.loadConnected();
  }

  loadConnected () {
    var promises = [this.getDevice(), this.getLogs(), this.getStatus()];
    return Promise.all(promises)
      .then(() => {
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  getDevice () {
    return fetch('http://173.31.120.214:1337/devices/' + this.props.match.params.deviceId + '/status')
      .then((res) => res.json())
      .then((data) => {
        this.setState({device: data.device});
      });
  }

  getStatus () {
    return fetch('http://173.31.120.214:1337/devices/' + this.props.match.params.deviceId + '/status')
      .then((res) => res.json())
      .then((data) => {
        this.setState({status: data.status});
      });
  }

  getLogs () {
    return fetch('http://173.31.120.214:1337/devices/' + this.props.match.params.deviceId + '/logs')
      .then((res) => res.json())
      .then((data) => {
        this.setState({logs: data.logs});
      });
  }

  render() {
    const {device, loading, logs} = this.state
    return (
      <div>
        {loading ?
            <CircularProgress scale={2}/>
          :
            <div>
              <div>{logs ?
                  logs.map(function(log, i){
                    return <div className="md-cell md-cell--4">
                      {log.message}
                    </div>
                  })
                : ''}</div>
              {this.props.match.params.deviceId}
            </div>
        }
      </div>

    );
  }
}

export default Device;
