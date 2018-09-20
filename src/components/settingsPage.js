import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import moment from 'moment';

import SettingsCard from './settingsCard'
import SettingsForm from './SettingsForm'

import { 
        fetchProgram,
        postProgramSettings,
        writeProgramTeamUser,
        deleteUser
    } from '../actions';

class SettingsPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            appData             : 'appData' in this.props ? this.props.appData: {},
            lastFetch           : moment().format('MM/DD @ hh:mma'),
            displayLoader       : false
        };

        this.updateLastFetch = this.updateLastFetch.bind(this);
        this.changeGlobalProgram = this.changeGlobalProgram.bind(this);
        this.updateProgramSettings = this.updateProgramSettings.bind(this);
        this.updateProgramTeamUser = this.updateProgramTeamUser.bind(this);
        this.deleteProgramUser = this.deleteProgramUser.bind(this);
        this.checkIfFetch = this.checkIfFetch.bind(this);
        this.changeLoaderDisplay = this.changeLoaderDisplay.bind(this);
        this.refreshProgram = this.refreshProgram.bind(this);
    }

    updateLastFetch () {
        this.setState({ 
          lastFetch: new moment().format('MM/DD @ hh:mma')
        }); 
    }

    changeGlobalProgram(newProgram) {
        this.props.fetchProgram(newProgram, this.state.appData, false);
    }

    updateProgramSettings (payload) {
        let fields = {
            'Program Name': 'prettyName',
            'Zendesk URL': 'zendeskURL',
            'Manager Email': 'managerEmail',
            'Goal Type': 'goal',
            'Olark Chats': 'olark',
        };
        let path = this.state.appData.globalProgram.settings.id + '/settings/' + fields[payload.field] + '/';
        postProgramSettings(path, payload.value);
        this.updateLastFetch();

    }

    updateProgramTeamUser (rootName, newUserObject, newTeamObject) {

        console.log('SettingsPage')

        let newState = JSON.parse(JSON.stringify(this.state));

        if (newTeamObject !== undefined) {
            newState.appData.globalProgram.team = newTeamObject;
            this.setState(newState, () => {writeProgramTeamUser(this.state.appData.globalProgram.settings.id, rootName, newUserObject)})
        } else writeProgramTeamUser(this.state.appData.globalProgram.settings.id, rootName, newUserObject)

        this.updateLastFetch();
    }

    deleteProgramUser(rootName) {
        let newState = JSON.parse(JSON.stringify(this.state));

        delete newState.appData.globalProgram.team[rootName];

        this.setState(newState, () => {deleteUser(this.state.appData.globalProgram.settings.id, rootName)})
        this.updateLastFetch();
    }

    refreshProgram() {
        this.props.fetchProgram(this.state.appData.globalProgram.settings.prettyName, this.state.appData, true);
    }

    componentDidUpdate () {
        this.checkIfFetch();
    }


    checkIfFetch() {

        const { FetchProgram } = this.props;

        if (!FetchProgram) return true;

        const newProgramName = FetchProgram.globalProgram.settings.id;
        const currentProgramName = this.state.appData.globalProgram.settings.id;

        if((newProgramName !== currentProgramName)) {
            let newAppData = {
                ...this.props.appData,
                appSettings: FetchProgram.appSettings,
                globalProgram: FetchProgram.globalProgram,
                productivityData: FetchProgram.productivityData
            }
            
            this.setState({ appData: newAppData}, () => this.updateLastFetch())
        }
    }

    changeLoaderDisplay(done) {
        this.setState( { displayLoader: !done } )
    }

	render() {

    const { appData } = this.props;
    const { changeGlobalProgram, updateProgramSettings, updateProgramTeamUser, changeLoaderDisplay, deleteProgramUser} = this;
		return (
		    	<div className="col-large" style={{ marginTop: '70px', width: '100%' }}>
                    <SettingsCard 
                        globalProgram={this.state.appData.globalProgram}
                        programList={this.state.appData.appSettings.programList} 
                        changeGlobalProgram = {changeGlobalProgram}
                        lastFetch = {this.state.lastFetch}
                        displayLoader = {this.state.displayLoader}
                    >
                        <SettingsForm globalProgram={this.state.appData.globalProgram} programList={this.state.appData.appSettings.programList} updateProgramSettings={updateProgramSettings} updateProgramTeamUser={updateProgramTeamUser} deleteProgramUser={deleteProgramUser} changeLoaderDisplay={changeLoaderDisplay}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);