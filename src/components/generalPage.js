/*
    General Page
    Main component for the live stats view. Receives productivity data
    and render team/individual linegraphs with it.

    Bugs:
    - When changing programs, queue data is mutated and ends up aggregating 
    non-existent labels
*/

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import moment from 'moment';

import { 
        getLinegraphData,
        fetchProgram,
        fetch
        } from '../actions';

import IndividualLinegraphRenderer from './individualLinegraphRenderer'
import TeamLinegraphRenderer from './teamLinegraphRenderer'
import ProductivityCard from './productivityCard'
import CardComponent from './cardComponent'

import Table from './table3'
import Radargraph from './radarGraph'
import Bargraph from './barGraph' 

class Generalpage extends Component {

    constructor(props){
        super(props);

        this.state = {
            appData: 'appData' in this.props ? this.props.appData: null,
            lastFetch: null
        };

        this.changeGlobalDate = this.changeGlobalDate.bind(this);
        this.changeGlobalProgram = this.changeGlobalProgram.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.checkIfFetch = this.checkIfFetch.bind(this);
    }

    componentWillMount() {
        this.props.getLinegraphData(this.props.appData.globalProgram, this.props.appData.productivityData)
    }

    componentDidUpdate() {
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
            
            this.props.getLinegraphData(newAppData.globalProgram, newAppData.productivityData)
            this.setState({ appData: newAppData, lastFetch: moment().format('X') })
        } else {
            return true;
        }
    }

    changeGlobalDate(newDate) {
        this.props.getLinegraphData(this.state.appData.globalProgram, this.state.appData.productivityData);

        const currentState = this.state;
        const { appData } = currentState;

        const newState = {
            ...currentState,
            appData: {
                ...appData,
                globalDate: newDate,
            }
        };
        this.setState(newState)
    }

    changeGlobalProgram(newProgram) {
        this.props.fetchProgram(newProgram, this.state.appData, false);
    }

    refreshData() {
        this.props.fetchProgram(this.state.appData.globalProgram.settings.prettyName, this.state.appData, true);
    }

    getDateList(productivityData){
        return Object.keys(productivityData).reverse();
    }

	render() {
        const { productivityData, GraphData } = this.props;
        const { appData, lastFetch } = this.state;
        const { changeGlobalProgram, changeGlobalDate, getDateList, refreshData } = this;

		return (
		    	<div className="col-large" style={{ marginTop: '70px', width: '100%' }}>
                    <div>
                        {
                            !productivityData  ?  <p> Man! Looks like there's no data for your program. <br /> If you think this is a mistake, hit up @dan. :-) </p> :
                                        <div>
                                            { !GraphData  ?  <p> Loading </p> : 
                                                <ProductivityCard 
                                                    globalDate          = {appData.globalDate}
                                                    globalProgram       = {appData.globalProgram}
                                                    changeGlobalDate    = {changeGlobalDate} 
                                                    changeGlobalProgram = {changeGlobalProgram}
                                                    dateList            = {getDateList(appData.productivityData)} 
                                                    programList         = {appData.appSettings.programList}
                                                    refreshData         = {refreshData}
                                                    lastFetch           = {lastFetch} 
                                                >

                                                    <h4 className="card-body-title"> TEAM </h4> 

                                                   { !GraphData ? <p> Loading </p> : <TeamLinegraphRenderer 
                                                                                        TeamGraphData = {GraphData} 
                                                                                        globalDate    = {appData.globalDate} /> }
                                                    <hr /> <br />
                                                    <h4 className="card-body-title"> INDIVIDUAL </h4>
                                                   { !GraphData ? <p> Loading </p> : <IndividualLinegraphRenderer 
                                                                                        IndividualGraphData = {GraphData.individualGraphData} 
                                                                                        globalDate         = {appData.globalDate}/> }
                                                </ProductivityCard> 
                                            }
                                        </div>
                        }               
                    </div>
		    	</div>
				)
	}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getLinegraphData : getLinegraphData,
        fetchProgram : fetchProgram
    }, dispatch);
}

function mapStateToProps(state){
    const {
        graphData,
        fetchProgram
    } = state;
    return { 
        GraphData : graphData,
        FetchProgram : fetchProgram
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Generalpage);