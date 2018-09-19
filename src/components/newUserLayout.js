import React, { Component } from 'react';

import TextInput from './textInput';

import ResponsiveModal from 'react-responsive-modal';

let _ = require('lodash');

export default class NewUserLayout extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            dailyGoal: 0,
            status: 'Active',
            shiftDuration: 0,
            Sun: {
              startTime: 0,
              active: true
            },
            Mon: {
              startTime: 0,
              active: true
            }, 
            Tues: {
              startTime: 0,
              active: true
            }, 
            Wed: {
              startTime: 0,
              active: true
            }, 
            Thurs: {
              startTime: 0,
              active: true
            }, 
            Fri: {
              startTime: 0,
              active: true
            }, 
            Sat: {
              startTime: 0,
              active: true
            }
        };

        this.stateMap = {
            'Email:': 'email',
            'Daily Goal:': 'dailyGoal',
            'Shift Duration:': 'shiftDuration',
            'Sunday': 'Sun',
            'Monday': 'Mon',
            'Tuesday': 'Tues',
            'Wednesday': 'Wed',
            'Thursday': 'Thurs',
            'Friday': 'Fri',
            'Saturday': 'Sat'
        }

        this.createNewUser = this.createNewUser.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    createNewUser (event) {
        event.preventDefault();

        let emailChunks = this.state.email.split('@partnerhero.com');

        if (emailChunks.length > 1) {
            let rootName = emailChunks[0].replace(/\./,'_');

            this.props.updateProgramTeamUser({rootName, newUserObject: this.state});

            this.props.closeModal();
        }

    }


    onChange (value, title, event) {

        let propertyName = this.stateMap[title];

        let property;

        if(propertyName !== 'email' && propertyName !== 'dailyGoal' && propertyName !== 'status' && propertyName !== 'shiftDuration') {

            property = JSON.parse(JSON.stringify(this.state[propertyName]));

            property['startTime'] = value;

            this.setState({ [propertyName]: property })
            

        } else {

            this.setState({ [propertyName]:  value })

        }

    }


    render() {

        const { onChange, createNewUser } = this;

        return (
            <div>
                <h5>User Information</h5>
                <form onSubmit={createNewUser}>
                    <div style={{display: 'table'}}>
                        <div style={{display: 'table-cell', width: '25%', textAlign: 'center'}}>
                            <TextInput title='Email:' value={this.state.email} onChange={onChange} groupStyle={{width: '90%', margin: 'auto'}}/>
                        </div>
                        <div style={{display: 'table-cell', width: '25%', textAlign: 'center'}}>
                            <TextInput groupClassName='settings-modal-input-group' inputClassName='settings-modal-input' title='Daily Goal:' value={this.state.dailyGoal} onChange={onChange} append={this.props.goal}/>
                        </div>
                    </div>
                <h5>Schedules</h5>
                <div style={{display: 'table'}}>
                    <div style={{display: 'table-cell', width: '25%', textAlign: 'center'}}>
                        <div>
                          <TextInput groupClassName='settings-modal-input-group' inputClassName='settings-modal-input' title='Shift Duration:' value={this.state.shiftDuration} onChange={onChange} append='Hrs'/>
                          <TextInput groupClassName='settings-modal-input-group' inputClassName='settings-modal-input' title='Sunday' value={this.state.Sun.startTime} onChange={onChange} append=':00'/>
                          <TextInput groupClassName='settings-modal-input-group' inputClassName='settings-modal-input' title='Monday' value={this.state.Mon.startTime} onChange={onChange} append=':00'/>
                          <TextInput groupClassName='settings-modal-input-group' inputClassName='settings-modal-input' title='Tuesday' value={this.state.Tues.startTime} onChange={onChange} append=':00'/>
                        </div>
                    </div>
                    <div style={{display: 'table-cell', width: '25%', textAlign: 'center'}}>    
                        <div>
                          <TextInput groupClassName='settings-modal-input-group' inputClassName='settings-modal-input' title='Wednesday' value={this.state.Wed.startTime} onChange={onChange} append=':00'/>
                          <TextInput groupClassName='settings-modal-input-group' inputClassName='settings-modal-input' title='Thursday' value={this.state.Thurs.startTime} onChange={onChange} append=':00'/>
                          <TextInput groupClassName='settings-modal-input-group' inputClassName='settings-modal-input' title='Friday' value={this.state.Fri.startTime} onChange={onChange} append=':00'/>
                          <TextInput groupClassName='settings-modal-input-group' inputClassName='settings-modal-input' title='Saturday' value={this.state.Sat.startTime} onChange={onChange} append=':00'/>
                        </div>
                      <br/>
                    </div>
                </div>
                  <input type="submit" value="Submit" className='btn btn-light' style={{float: 'right'}}/>
                </form> 
            </div>
        )
    }
}