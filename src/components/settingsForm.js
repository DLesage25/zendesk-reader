import React, { Component } from 'react';
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
    }

    readData () {
      let programsPath = {
        Grindr: "grindr",
        "Khan Academy": "khan"
      };
      if(this.props.programName){
        let ref = 'programs/' + programsPath[this.props.programName] + '/settings';
        FB.read(ref).then((result) => {
            console.log("Firebase Result for \"" + ref + "/\": " + JSON.stringify(result))

            this.setState({ 
              programName: result.prettyName,
              zendeskURL: result.managerId,
              managerEmail: result.managerId,
              goal: result.goal,
              olark: result.olark
            });  
        })
        console.log("Visual Data Updated!")
      }
    }

    componentDidMount() {
      this.readData(); 
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ programName: nextProps.programName }, () => this.readData());  
    }


	render() {

		return (
      <div className="row">
  			<div className="col-md">
            <TextInput title="Program Name" placeholder={this.state.programName} aria-label="Username" aria-describedby="basic-addon1"/>
            <TextInput title="Zendesk URL" placeholder={this.state.zendeskURL} aria-label="Recipient's username" aria-describedby="basic-addon2" prepend="https://" append=".zendesk.com"/>
            <TextInput title="Manager Email" placeholder={this.state.managerEmail} aria-label="Recipient's username" aria-describedby="basic-addon2" append="@partnerhero.com"/>
  			</div>
        <div className="col-sm">
          <SettingsButtonsGroup title="Goal Type" goal={this.state.goal}/>
          <SettingsButtonsGroup title="Olark Chats" olark={this.state.olark}/>  
        </div>
      </div>
		)
	}
}