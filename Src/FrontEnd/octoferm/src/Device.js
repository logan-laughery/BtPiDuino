import React, { Component } from 'react';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import Card from 'react-md/lib/Cards/Card';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import './Device.css';

class Device extends Component {
  state = {
    deviceId: null,
    device: null,
    logs: null,
    statuses: null,
    loading: true
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
    return fetch('http://localhost:1337/devices/' + this.props.match.params.deviceId + '/status')
      .then((res) => res.json())
      .then((data) => {
        this.setState({device: data.device});
      });
  }

  getStatus () {
    return fetch('http://localhost:1337/devices/' + this.props.match.params.deviceId + '/status')
      .then((res) => res.json())
      .then((data) => {
        this.setState({statuses: data.status});
      });
  }

  getLogs () {
    return fetch('http://localhost:1337/devices/' + this.props.match.params.deviceId + '/logs')
      .then((res) => res.json())
      .then((data) => {
        this.setState({logs: data.logs});
      });
  }

  render() {
    const {device, loading, logs, statuses} = this.state
    return (
      <div className="md-cell md-cell--12 device-container">
        {loading
          ? <CircularProgress scale={2}/>
          :[
            <Card className="md-cell md-cell--8">
              <DataTable plain>
                <TableBody>
                  {logs ?
                    logs.map((log, i) =>
                      <TableRow key={i}>
                        <TableColumn>{log.createdAt}</TableColumn>
                        <TableColumn>{log.message}</TableColumn>
                      </TableRow>
                    )
                    : ''
                  }
                </TableBody>
              </DataTable>
            </Card>,
            <Card className="md-cell md-cell--4">
              <DataTable plain>
                <TableBody>
                  {statuses.map((status, i) =>
                    <TableRow key={i}>
                      <TableColumn>{status.temperature}</TableColumn>
                    </TableRow>
                  )}
                </TableBody>
              </DataTable>
            </Card>,
            this.props.match.params.deviceId
          ]
        }
      </div>
    );
  }
}

export default Device;
