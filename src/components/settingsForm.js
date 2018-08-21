import React, { Component } from 'react';
import moment from 'moment';

import TextInput from './textInput';
import SettingsButtonsGroup from './settingsButtonsGroup';

export default class SettingsForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            programName: '',
            zendeskURL: "",
            managerEmail: "",
            goal: '',
            olark: false
        };

        this.updateLocalAppData = this.updateLocalAppData.bind(this);

    }

    updateLocalAppData (newState) {
      let newData = newState ? newState.globalProgram.settings : this.props.globalProgram.settings;

      this.setState({ 
        programName: newData.prettyName,
        zendeskURL: newData.zendeskURL,
        managerEmail: newData.managerEmail,
        goal: newData.goal,
        olark: newData.olark 
      }); 
    }

    componentDidMount() {
      this.updateLocalAppData();
    }

    componentWillReceiveProps(nextProps) {
      this.updateLocalAppData(nextProps);  
    }


	render() {

    const { updateProgramSettings } = this.props;

		return (
      <div className="container">
        <div className="row">
    			<div className="col-md">
              <TextInput title="Program Name" value={this.state.programName} aria-label="Username" aria-describedby="basic-addon1" updateFBData={updateProgramSettings}/>
              <TextInput title="Zendesk URL" value={this.state.zendeskURL} aria-label="Recipient's username" aria-describedby="basic-addon2" prepend="https://" append=".zendesk.com" updateFBData={updateProgramSettings}/>
              <TextInput title="Manager Email" value={this.state.managerEmail} aria-label="Recipient's username" aria-describedby="basic-addon2" append="@partnerhero.com" updateFBData={updateProgramSettings}/>
    			</div>
          <div className="col-sm">
            <SettingsButtonsGroup title="Goal Type" goal={this.state.goal} updateFBData={updateProgramSettings}/>
            <SettingsButtonsGroup title="Olark Chats" olark={this.state.olark} updateFBData={updateProgramSettings}/>  
          </div>
        </div>
      </div>
		)
	}
}