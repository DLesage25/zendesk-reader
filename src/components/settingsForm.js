import React, { Component } from 'react';
import moment from 'moment';

import Table from './table3';
import TextInput from './textInput';
import SettingsButtonsGroup from './settingsButtonsGroup';

export default class SettingsForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            programName  : '',
            zendeskURL   : '',
            managerEmail : '',
            goal         : '',
            olark        : false
        };

        this.updateLocalAppData   = this.updateLocalAppData.bind(this);
        this.onChange             = this.onChange.bind(this);
        this.timerHandler         = this.timerHandler.bind(this);
        this.doneInterval         = this.doneInterval.bind(this);

        this.timer;                        //timer identifier
        this.timerInterval        = 3000;  //3s
    }

    updateLocalAppData (newState) {
      let newData = newState ? newState.globalProgram.settings : this.props.globalProgram.settings;

      if (newData.prettyName !== this.state.programName) {
        this.setState({ 
          programName: newData.prettyName,
          zendeskURL: newData.zendeskURL,
          managerEmail: newData.managerEmail,
          goal: newData.goal,
          olark: newData.olark 
        });
      } 
    }

    doneInterval (value, field) {
      this.props.changeLoaderDisplay(true);
      this.props.updateProgramSettings({value: value, field: field});
    }

    timerHandler (value, field) {
      clearTimeout(this.timer);
      this.props.changeLoaderDisplay();
      this.timer = setTimeout(() => this.doneInterval(value, field), this.timerInterval);
    }

    onChange (value, field) {
      if(field === 'Goal Type' || field === 'Olark Chats') ((typeof(value) === "boolean") ? this.setState({ olark: value}) : this.setState({ goal: value}))
        else { ((field === 'Program Name') ? this.setState({ programName: value}) : ((field === 'Zendesk URL') ? this.setState({ zendeskURL: value}) : this.setState({ managerEmail: value}))) }
      this.timerHandler(value, field);
    }
    
    componentDidMount() {
      this.updateLocalAppData();
    }

    componentWillReceiveProps(nextProps) {
      this.updateLocalAppData(nextProps);  
    }

	render() {

    const { updateProgramSettings } = this.props;
    const { onChange } = this;

    const olarkChats = [
          { value: true, className: ((this.state.olark) ? 'btn btn-secondary active' : 'btn btn-secondary')},
          { value: false, className: ((!this.state.olark) ? 'btn btn-secondary active' : 'btn btn-secondary')},
        ];

    const goalType = [
          { value: 'touches', className: ((this.state.goal === 'touches') ? 'btn btn-secondary active' : 'btn btn-secondary')},
          { value: 'solved', className: ((this.state.goal === 'solved') ? 'btn btn-secondary active' : 'btn btn-secondary')},
          { value: 'chats', className: ((this.state.goal === 'chats') ? 'btn btn-secondary active' : 'btn btn-secondary')}
        ];    

		return (
      <div className="container">
        <div className="row">
    			<div className="col-md">
              <TextInput title="Program Name" value={this.state.programName} aria-label="Username" aria-describedby="basic-addon1" onChange={onChange} disabled={true}/>
              <TextInput title="Zendesk URL" value={this.state.zendeskURL} aria-label="Recipient's username" aria-describedby="basic-addon2" prepend="https://" append=".zendesk.com" onChange={onChange}/>
              <TextInput title="Manager Email" value={this.state.managerEmail} aria-label="Recipient's username" aria-describedby="basic-addon2" append="@partnerhero.com" onChange={onChange}/>
    			</div>
          <div className="col-md">
            <SettingsButtonsGroup options = {goalType} title = 'Goal Type' onClick={onChange}/>
            <SettingsButtonsGroup options = {olarkChats} title = 'Olark Chats' onClick={onChange}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg">
            <label> Schedules </label>
            <Table /> 
          </div>
        </div>
      </div>
		)
	}
}