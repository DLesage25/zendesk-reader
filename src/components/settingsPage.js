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

class SettingsPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            appData   : 'appData' in this.props ? this.props.appData: {},
            lastFetch : moment().format('MM/DD @ hh:mma')
        };

        this.updateLastFetch = this.updateLastFetch.bind(this);
        this.changeGlobalProgram = this.changeGlobalProgram.bind(this);
        this.updateProgramSettings = this.updateProgramSettings.bind(this);
        this.checkIfFetch = this.checkIfFetch.bind(this);
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

    componentDidUpdate () {
        this.checkIfFetch();
    }


    checkIfFetch() {

        const { FetchProgram } = this.props;

        if (!FetchProgram) return true;

        const newProgramName = FetchProgram.globalProgram.settings.id;
        const currentProgramName = this.state.appData.globalProgram.settings.id;

        const isRefresh = FetchProgram.isRefresh;

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

	render() {
        const { appData } = this.props;
        const { changeGlobalProgram, updateProgramSettings } = this;
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);