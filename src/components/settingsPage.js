import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import moment from 'moment';

import SettingsCard from './settingsCard'
import SettingsForm from './SettingsForm'

import { 
        fetchProgram
    } from '../actions';

class GeneralSettings extends Component {

    constructor(props){
        super(props);

        this.state = {
            appData: 'appData' in this.props ? this.props.appData: {}
        };

        this.updateSettingsForm = this.updateSettingsForm.bind(this);
        this.changeGlobalProgram = this.changeGlobalProgram.bind(this);


    }
    // componentWillMount() {
    //     this.props.getSettings(this.props.StartupData.programData, this.props.StartupData.productivityData)
    // }

    changeGlobalProgram(newProgram) {
        console.log("Enters")
        this.props.fetchProgram(newProgram, this.state.appData, false);
    }

    updateSettingsForm (programName) {
        
    }

	render() {
        const { appData } = this.props;
        const { changeGlobalProgram } = this;
        //to-do: remove getlinegraphdata from getdatelist function and prevent it from mutating
		return (
		    	<div className="col-large" style={{ marginTop: '70px', width: '100%' }}>
                    <SettingsCard 
                        globalProgram={this.state.appData.globalProgram}
                        programList={this.state.appData.appSettings.programList} 
                        action={changeGlobalProgram}
                    >
                        <SettingsForm programName={this.state.appData.globalProgram.settings.prettyName}/>
                    </SettingsCard>
		    	</div>
				)
	}
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
        fetchProgram : fetchProgram
    }, dispatch);
}

function mapStateToProps(state){
    const {
        fetchProgram
    } = state;
    return { 
        FetchProgram : fetchProgram
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);