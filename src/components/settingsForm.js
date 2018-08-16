import React, { Component } from 'react';
import moment from 'moment';

import TextInput from './textInput';
import SettingsButtonsGroup from './settingsButtonsGroup';
import FB from '../modules/firebaseDAO';

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

        this.readData = this.readData.bind(this);
        this.updateFBData = this.updateFBData.bind(this);
        
        this.programsPath = {
          Grindr: "grindr",
          "Khan Academy": "khan"
        };
    }

    readData () {
      if(this.props.programName){
        let ref = 'programs/' + this.programsPath[this.props.programName] + '/settings';
        FB.read(ref).then((result) => {
            console.log("Firebase Result for \"" + ref + "/\": " + JSON.stringify(result))

            this.setState({ 
              programName: result.prettyName,
              zendeskURL: result.zendeskURL,
              managerEmail: result.managerEmail,
              goal: result.goal,
              olark: result.olark
            });  
        })
        console.log("Visual Data Updated!")
      }
    }

    updateFBData (payload) {
      let fields = {
        'Program Name': 'prettyName',
        'Zendesk URL': 'zendeskURL',
        'Manager Email': 'managerEmail',
        'Goal Type': 'goal',
        'Olark Chats': 'olark',
      };
      let ref = 'programs/' + this.programsPath[this.props.programName] + '/settings/' + fields[payload.field];
      FB.database.ref(ref).set(payload.value);
      this.props.updateLastFetch(moment().format('MM/DD @ hh:mma'));
      console.log("Settings Form Data Updated! " + JSON.stringify(payload))
    }

    componentDidMount() {
      this.readData(); 
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ programName: nextProps.programName }, () => this.readData());  
    }


	render() {

		return (
      <div className="container">
        <div className="row">
    			<div className="col-md">
              <TextInput title="Program Name" value={this.state.programName} aria-label="Username" aria-describedby="basic-addon1" updateFBData={(payload) => this.updateFBData(payload)}/>
              <TextInput title="Zendesk URL" value={this.state.zendeskURL} aria-label="Recipient's username" aria-describedby="basic-addon2" prepend="https://" append=".zendesk.com" updateFBData={(payload) => this.updateFBData(payload)}/>
              <TextInput title="Manager Email" value={this.state.managerEmail} aria-label="Recipient's username" aria-describedby="basic-addon2" append="@partnerhero.com" updateFBData={(payload) => this.updateFBData(payload)}/>
    			</div>
          <div className="col-sm">
            <SettingsButtonsGroup title="Goal Type" goal={this.state.goal} updateFBData={(payload) => this.updateFBData(payload)}/>
            <SettingsButtonsGroup title="Olark Chats" olark={this.state.olark} updateFBData={(payload) => this.updateFBData(payload)}/>  
          </div>
        </div>
      </div>
		)
	}
}