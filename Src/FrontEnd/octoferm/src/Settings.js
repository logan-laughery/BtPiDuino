import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';
import Card from 'react-md/lib/Cards/Card';
import CardTitle from 'react-md/lib/Cards/CardTitle';
import CardActions from 'react-md/lib/Cards/CardActions';
import CardText from 'react-md/lib/Cards/CardText';
import Button from 'react-md/lib/Buttons'; 
import SelectField from 'react-md/lib/SelectFields';
import TextField from 'react-md/lib/TextFields';
import Snackbar from 'react-md/lib/Snackbars';
import './Settings.css';

class Settings extends Component {
  state = {
    deviceId: null,
    settings: null,
    loading: true,
    toasts: [],
    autohide: true
  }

  componentDidMount() {
    this.setState({deviceId: this.props.match.params.deviceId});
    this.loadSettings();
  }

  loadSettings () {
    return fetch('http://localhost:1337/devices/' + this.props.match.params.deviceId + '/settings')
      .then((res) => res.json())
      .then((data) => {
        this.setState({settings: data.settings});
        this.setState({loading: false});
      })
      .catch((err) => {
        this.setState({loading: false}); 
      });
  }

  saveSettings = () => {
    console.log(this.state.settings);
    fetch('http://localhost:1337/devices/' + this.state.deviceId + '/settings', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        temperature: this.state.settings.temperature,
        pumpState: this.state.settings.pumpState
      })
    })
    .then(() => this.toastSuccess())
    .catch((err) => {
      this.toastError() 
    });  
  }

  dismissToast = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({toasts});
  }

  addToast = (text, action, autohide = true) => {
    const toasts = this.state.toasts.slice(); 
    toasts.push({text,action});
    this.setState({toasts});
  }

  handleChange = (value) => {
    let settings = Object.assign({}, this.state.settings);    //creating copy of object
    settings.pumpState = value; //updating value
    this.setState({settings});
  }

  handleTempChange = (value) => {
    let settings = Object.assign({}, this.state.settings);
    settings.temperature = value;
    this.setState({settings});
  }

  toastSuccess = () => {
    this.addToast('Settings saved!'); 
  }

  toastError = () => {
    this.addToast('Error saving settings'); 
  }

  render() {
    const pumpStates = ['auto', 'on', 'off'];
    const {loading, settings, deviceId, toasts, autohide} = this.state;
    return (
      <div className="md-cell md-cell--12">
        {loading 
          ? <CircularProgress scale={2}/>
          : <div className='md-grid'>
              <Card className='md-cell md-cell--6'>
                <CardTitle title={'Device #' + deviceId}/>
                <hr/>
                <CardText>
                  <div className='md-grid md-grid--no-spacing'>
                    <div className='md-cell md-cell--6'>
                      <div className='md-font-light'>Pump State</div>
                      <SelectField 
                        menuItems={pumpStates} 
                        value={settings.pumpState} 
                        onChange={this.handleChange} />            
                    </div>
                    <div className='md-cell md-cell--6'>
                      <div className='md-font-light'>Temperature</div>
                      <TextField type='number' size={10} fullWidth={false} 
                        value={settings.temperature}
                        onChange={this.handleTempChange} /> 
                    </div>
                  </div>
                </CardText>
                <CardActions className='right'>
                  <Link to={'/devices/' + deviceId}>
                    <Button flat primary label="Cancel"></Button>
                  </Link>
                  <Button flat secondary label="Save" 
                    onClick={this.saveSettings}
                  ></Button>
                </CardActions>
              </Card>
              <Snackbar
                toasts={toasts}
                autohide={autohide}
                onDismiss={this.dismissToast}
              />
            </div>
        }
      </div>
    );
  }
}

export default Settings;
