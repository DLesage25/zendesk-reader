import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import moment from 'moment';

import SettingsCard from './settingsCard'
import SettingsForm from './SettingsForm'

class GeneralSettings extends Component {

    constructor(props){
        super(props);

        this.state = {
            programName: "Khan Academy"
        };

        this.updateSettingsForm = this.updateSettingsForm.bind(this);

    }
    // componentWillMount() {
    //     this.props.getSettings(this.props.StartupData.programData, this.props.StartupData.productivityData)
    // }

    updateSettingsForm (programName) {
        this.setState({
           programName: programName
        }, () => {console.log("Settings Page - Program Name: " + this.state.programName)});
    }

	render() {
        const { appData } = this.props;
        //to-do: remove getlinegraphdata from getdatelist function and prevent it from mutating
		return (
		    	<div className="col-large" style={{ marginTop: '70px', width: '100%' }}>
                    <SettingsCard 
                        globalProgram={appData.globalProgram}
                        programList={appData.appSettings.programList} 
                        action={(programName) => this.updateSettingsForm(programName)}
                    >
                        <SettingsForm programName={this.state.programName}/>
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