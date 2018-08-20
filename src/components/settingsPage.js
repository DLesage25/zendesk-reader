import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import moment from 'moment';

import SettingsCard from './settingsCard'
import SettingsForm from './SettingsForm'

import { 
        fetchProgram,
        postProgramSettings
    } from '../actions';

class GeneralSettings extends Component {

    constructor(props){
        super(props);

        this.state = {
            appData: 'appData' in this.props ? this.props.appData: {},
            lastFetch: moment().format('MM/DD @ hh:mma')
        };

        this.updateLastFetch = this.updateLastFetch.bind(this);


        this.changeGlobalProgram = this.changeGlobalProgram.bind(this);

        this.updateProgramSettings = this.updateProgramSettings.bind(this);


        this.checkIfFetch = this.checkIfFetch.bind(this);

    }
    // componentWillMount() {
    //     this.props.getSettings(this.props.StartupData.programData, this.props.StartupData.productivityData)
    // }

    updateLastFetch (timestamp) {
        this.setState({ 
          lastFetch: timestamp
        }); 
    }

    changeGlobalProgram(newProgram) {
        this.props.fetchProgram(newProgram, this.state.appData, false);
    }

    updateProgramSettings (payload) {
        console.log("data to update " + JSON.stringify(payload))
        let fields = {
            'Program Name': 'prettyName',
            'Zendesk URL': 'zendeskURL',
            'Manager Email': 'managerEmail',
            'Goal Type': 'goal',
            'Olark Chats': 'olark',
        };
        let path = this.state.appData.appSettings.programList.filter((o) => { return o.prettyName ===  this.state.appData.globalProgram.settings.prettyName })[0].id + '/settings/' + fields[payload.field] + '/';
        postProgramSettings(path, payload.value);
        let timestamp = new moment().format('MM/DD @ hh:mma');
        this.updateLastFetch(timestamp);

    }

    componentDidUpdate () {
        this.checkIfFetch();
    }


    checkIfFetch() {
        const { FetchProgram } = this.props;

        if (!FetchProgram) return true;

        const newProgramName = FetchProgram.globalProgram.settings.id;
        const currentProgramName = this.state.appData.globalProgram.settings.id;

        const isRefresh = FetchProgram.isRefresh;
        const timeSinceLastFetch = moment().format('X') - this.state.lastFetch;

        if((isRefresh || newProgramName !== currentProgramName) && timeSinceLastFetch > 5) {
            let newAppData = {
                ...this.props.appData,
                appSettings: FetchProgram.appSettings,
                globalProgram: FetchProgram.globalProgram,
                productivityData: FetchProgram.productivityData
            }
            
            this.setState({ appData: newAppData, lastFetch: moment().format('X') })
        }
    }

	render() {
        const { appData } = this.props;
        const { changeGlobalProgram, updateProgramSettings } = this;
        //to-do: remove getlinegraphdata from getdatelist function and prevent it from mutating
		return (
		    	<div className="col-large" style={{ marginTop: '70px', width: '100%' }}>
                    <SettingsCard 
                        globalProgram={this.state.appData.globalProgram}
                        programList={this.state.appData.appSettings.programList} 
                        changeGlobalProgram = {changeGlobalProgram}
                        lastFetch = {this.state.lastFetch}
                    >
                        <SettingsForm globalProgram={this.state.appData.globalProgram} programList={this.state.appData.appSettings.programList} updateProgramSettings={updateProgramSettings}/>
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