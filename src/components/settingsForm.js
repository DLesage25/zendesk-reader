import React, { Component } from 'react';
import TextInput from './textInput';
import SettingsButtonsGroup from './settingsButtonsGroup'

export default class SettingsForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            
        };
    }

	render() {

		return (
      <div className="row">
  			<div className="col-md">
            <TextInput title="Program Name" placeholder="Acme corp" aria-label="Username" aria-describedby="basic-addon1"/>
            <TextInput title="Zendesk URL" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" prepend="https://" append=".zendesk.com"/>
            <TextInput title="Manager Email" placeholder="someone" aria-label="Recipient's username" aria-describedby="basic-addon2" append="@partnerhero.com"/>
  			</div>
        <div className="col-sm">
          <SettingsButtonsGroup title="Goal Type"/>
          <SettingsButtonsGroup title="Olark Chats"/>  
        </div>
      </div>
		)
	}
}