import React, { Component } from 'react';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import Card from 'react-md/lib/Cards/Card';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableBody from 'react-md/lib/DataTables/TableBody';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import './Device.css';
import Moment from 'moment';
var LineChart = require('react-chartjs').Line;

class Device extends Component {
  state = {
    deviceId: null,
    device: null,
    logs: null,
    statuses: [],
    loading: true,
    skip: 30
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
    var current = Moment();
    var after = Moment();
    after.subtract(1, 'day');
    return fetch('http://localhost:1337/devices/' + this.props.match.params.deviceId + '/status/minute' +
      '?before=' + current.format('YYYY-MM-DD h:mm:ss')  + '&after=' + after.format('YYYY-MM-DD h:mm:ss'))
      .then((res) => res.json())
      .then((data) => {
        this.setState({statuses: data.statuses});
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
    const {device, loading, logs, statuses, skip} = this.state
    const options = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            min: 40,
            max: 90,
            stepSize: 5
          }
        }],
        xAxes: [{
          type: 'time',
          display: true,
          time: {
            format: 'MMMM DD'
          }
        }]
      }
    };
    const datasets = {labels: statuses.filter((status, i) => i % skip === 0)
        .map((status) => Moment(status.createdAt).toDate()),
      datasets: [{
      label: 'Temperature',
      data: statuses.filter((status, i) => i % skip === 0).map((status) => status.temperature),
      backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
    }]};
    return (
      <div className="md-cell md-cell--12">
        <div className="md-grid">
        {loading
          ? <CircularProgress scale={2}/>
          :[
            <Card className="md-cell md-cell--12">
              <LineChart data={datasets} options={options}/>
            </Card>,
            <Card className="md-cell md-cell--12">
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
            this.props.match.params.deviceId
          ]
        }
        </div>
      </div>
    );
  }
}

export default Device;
