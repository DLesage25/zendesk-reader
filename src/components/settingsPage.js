import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import moment from 'moment';

import SettingsCard from './settingsCard'
import SettingsForm from './SettingsForm'
import SettingsButtonsGroup from './settingsButtonsGroup'

class GeneralSettings extends Component {

    constructor(props){
        super(props);

        this.state = {};
    }
    // componentWillMount() {
    //     this.props.getSettings(this.props.StartupData.programData, this.props.StartupData.productivityData)
    // }

	render() {
        //to-do: remove getlinegraphdata from getdatelist function and prevent it from mutating
		return (
		    	<div className="col-large" style={{ marginTop: '70px', width: '100%' }}>
            <SettingsCard>
                <div className="container">
                    <div className="row">
                        <SettingsForm/>
                        <div className="col-sm">
                          <SettingsButtonsGroup title="Goal Type"/>
                          <SettingsButtonsGroup title="Olark Chats"/>  
                        </div>
                    </div>
                </div>
            </SettingsCard>
		    	</div>
				)
	}
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state){
    const {
    } = state;
    return { 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);