import React, { Component } from 'react';
import moment from 'moment';

import Table from './scheduleTable';
import TextInput from './textInput';
import Modal from './modal';
import SettingsButtonsGroup from './settingsButtonsGroup';

import NewUserLayout from './newUserLayout.js';
let toolTipsText = require('../modules/toolTipsText');

export default class SettingsForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            programName  : '',
            zendeskURL   : '',
            managerEmail : '',
            goal         : '',
            olark        : false,
            modalState   : false,
            team         : {},
        };

        this.updateLocalAppData    = this.updateLocalAppData.bind(this);
        this.onInputChange         = this.onInputChange.bind(this);
        this.updateProgramTeamUser = this.updateProgramTeamUser.bind(this);
        this.createProgramTeamUser = this.createProgramTeamUser.bind(this);
        this.deleteProgramUser     = this.deleteProgramUser.bind(this);
        this.timerHandler          = this.timerHandler.bind(this);
        this.doneInterval          = this.doneInterval.bind(this);
        this.changeModalState      = this.changeModalState.bind(this);
        this.dynamicSort           = this.dynamicSort.bind(this);


        this.timer;                        //timer identifier
        this.timerInterval        = 3000;  //3s
    }

    updateLocalAppData (newState) {
      let newData = newState ? newState.globalProgram.settings : this.props.globalProgram.settings;

      let newTeam = newState ? newState.globalProgram.team : this.props.globalProgram.team;

      if (newData.prettyName !== this.state.programName) {
        this.setState({ 
          programName: newData.prettyName,
          zendeskURL: newData.zendeskURL,
          managerEmail: newData.managerEmail,
          goal: newData.goal,
          olark: newData.olark,
          team: newTeam
        });
      } else if(newTeam && newTeam.length !== this.state.team) this.setState({ team: newTeam })
    }

    doneInterval (callback) {
      this.props.changeLoaderDisplay(true);
    }

    timerHandler (callback) {
      clearTimeout(this.timer);
      this.props.changeLoaderDisplay();
      this.timer = setTimeout(() => this.doneInterval(callback), this.timerInterval);
    }

    onInputChange (value, field) {
      if(field === 'Goal Type' || field === 'Olark Chats') ((typeof(value) === "boolean") ? this.setState({ olark: value}) : this.setState({ goal: value}))
        else { ((field === 'Program Name') ? this.setState({ programName: value}) : ((field === 'Zendesk URL') ? this.setState({ zendeskURL: value}) : this.setState({ managerEmail: value}))) }
      this.timerHandler(this.props.updateProgramSettings({value: value, field: field}));
    }

    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }

    updateProgramTeamUser(payload) {
      this.timerHandler(this.props.updateProgramTeamUser(payload.rootName, payload.newUserObject));
    }

    deleteProgramUser(rootName) {
      this.timerHandler(this.props.deleteProgramUser(rootName));
    }

    createProgramTeamUser(payload) {

      let team = JSON.parse(JSON.stringify(this.state.team)) || JSON.parse(JSON.stringify(this.props.globalProgram.team));

      let teamArray = JSON.parse(JSON.stringify(team));

      teamArray = Object.values(teamArray);

      if (!teamArray.filter((member) => { return member.email === payload.newUserObject.email; })[0]){

        team[payload.rootName] = payload.newUserObject;

        this.timerHandler(this.props.updateProgramTeamUser(payload.rootName, payload.newUserObject, team));
      }
    }
    
    componentDidMount() {
      this.updateLocalAppData();
    }

    componentWillReceiveProps(nextProps) {
      this.updateLocalAppData(nextProps);  
    }

    changeModalState() {
      this.setState({modalState: !this.state.modalState})
    }

	render() {

    const { updateProgramSettings } = this.props;
    const { onInputChange, updateProgramTeamUser, createProgramTeamUser, changeModalState, deleteProgramUser } = this;

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
              <TextInput title="Program Name" value={this.state.programName} aria-label="Username" aria-describedby="basic-addon1" onChange={onInputChange} disabled={true}/>
              <TextInput title="Zendesk URL" value={this.state.zendeskURL} aria-label="Recipient's username" aria-describedby="basic-addon2" prepend="https://" append=".zendesk.com" onChange={onInputChange} hint={toolTipsText['zendeskURL']}/>
              <TextInput title="Manager Email" value={this.state.managerEmail} aria-label="Recipient's username" aria-describedby="basic-addon2" append="@partnerhero.com" onChange={onInputChange} hint={toolTipsText['managerEmail']}/>
          </div>
          <div className="col-sm">
            <SettingsButtonsGroup options = {goalType} title = 'Goal Type' onClick={onInputChange} hint={toolTipsText['goalType']}/>
            <SettingsButtonsGroup options = {olarkChats} title = 'Olark Chats' onClick={onInputChange} hint={toolTipsText['olarkChats']}/>
          </div>
        </div>
        <div className="row">
          <div className="col-lg">
            <label> Team Management </label>
            <button className='btn btn-secondary' style={{marginLeft: '8px', width: '23px', height: '22px', padding: '0 !important', lineHeight: '0'}} onClick={changeModalState}>+</button>
            <Table team={this.state.team} programName={this.state.programName} updateProgramTeamUser={updateProgramTeamUser} deleteProgramUser={deleteProgramUser}/> 
          </div>
        </div>
        <Modal open={this.state.modalState} onClose={changeModalState} id='newUserModal' >
          <NewUserLayout updateProgramTeamUser={createProgramTeamUser} closeModal={changeModalState} goal={this.state.goal}/>
        </Modal>
      </div>
		)
	}
}