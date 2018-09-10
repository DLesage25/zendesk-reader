/*
    General Page
    Main component for the live stats view. Receives productivity data
    and render team/individual linegraphs with it.
*/

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import moment from 'moment';

import { 
        getLinegraphData,
        fetchProgram
    } from '../actions';

import IndividualLinegraphRenderer from './individualLinegraphRenderer'
import TeamGraphRenderer from './teamGraphRenderer'
import ProductivityCard from './productivityCard'

import Table from './table3'
import Bargraph from './barGraph' 

class Generalpage extends Component {

    constructor(props){
        super(props);

        this.state = {
            appData       : 'appData' in this.props ? this.props.appData: null,
            lastFetch     : null,
            Key           : Math.random(),
            displayLoader : false

        };

        this.changeGlobalDate = this.changeGlobalDate.bind(this);
        this.changeGlobalProgram = this.changeGlobalProgram.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.checkIfFetch = this.checkIfFetch.bind(this);
        this.changeLoaderDisplay = this.changeLoaderDisplay.bind(this);
        this.refreshChartsData = this.refreshChartsData.bind(this);

    }

    componentWillMount() {
        this.props.getLinegraphData(this.props.appData.globalProgram, this.props.appData.productivityData)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.checkIfFetch();
    }

    changeLoaderDisplay(done) {
        this.setState( { displayLoader: !done } )
    }

    checkIfFetch() {

        const { FetchProgram } = this.props;

        if (!FetchProgram) return true;

        const newProgramName = FetchProgram.globalProgram.settings.id;
        const currentProgramName = this.state.appData.globalProgram.settings.id;

        const isRefresh = FetchProgram.isRefresh;
        const timeSinceLastFetch = moment().format('X') - this.state.lastFetch;

        let outOfRangeDatePicked = FetchProgram.productivityData ? Object.getOwnPropertyNames(FetchProgram.productivityData)[0] !== Object.getOwnPropertyNames(this.state.appData.productivityData)[0] : false;

        if((isRefresh || newProgramName !== currentProgramName) && timeSinceLastFetch > 5 || outOfRangeDatePicked) {
            let newAppData = {
                ...this.props.appData,
                appSettings: FetchProgram.appSettings,
                globalDate: FetchProgram.globalDate,
                globalProgram: FetchProgram.globalProgram,
                productivityData: FetchProgram.productivityData
            }
            
            this.props.getLinegraphData(newAppData.globalProgram, newAppData.productivityData)
            this.setState({ 
                            appData: newAppData, 
                            lastFetch: moment().format('X'), 
                            Key: Math.random() 
                         })
        } else {
            return true;
        }
    }

    refreshChartsData() {

        let currentDate = this.state.appData.globalDate;

        let findDateInCurrentProductivityData = Object.getOwnPropertyNames(this.state.appData.productivityData).find(function(date) {
            return date == currentDate;
        })

        if(!findDateInCurrentProductivityData) this.changeGlobalProgram(this.state.appData.globalProgram.settings.prettyName, moment(this.state.appData.globalDate.replace(/_/g,'/'), 'MM-DD-YYYY'))

        return true;
    }

    changeGlobalDate(newDate) {
        const currentState = this.state;
        const { appData } = currentState;

        const newState = {
            ...currentState,
            appData: {
                ...appData,
                globalDate: newDate,
            },
            Key: Math.random()
        };
        this.setState(newState, () => {this.refreshChartsData()})
    }

    changeGlobalProgram(newProgram, date) {
        this.changeLoaderDisplay();
        this.props.fetchProgram(newProgram, this.state.appData, false, () => { this.changeLoaderDisplay(true) }, date);
    }

    refreshData() {
        this.changeLoaderDisplay();
        this.props.fetchProgram(this.state.appData.globalProgram.settings.prettyName, this.state.appData, true, () => {this.changeLoaderDisplay(true)});
    }

    getDateList(productivityData){
        return Object.keys(productivityData);
    }

	render() {
        const { GraphData } = this.props;
        const { appData, lastFetch, Key } = this.state;
        const { changeGlobalProgram, changeGlobalDate, getDateList, refreshData } = this;
		return (
		    	<div className="col-large" style={{ marginTop: '70px', width: '100%' }}>
                    <div>
                        {
                            !appData.productivityData  ?  <p> Man! Looks like there's no data for your program. <br /> If you think this is a mistake, hit up @dan. :-) </p> :
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
                                                    displayLoader       = {this.state.displayLoader}
                                                     >

                                                    <h4 className="card-body-title"> TEAM </h4> 
                                                    { !GraphData ? <p> Loading </p> : <TeamGraphRenderer 
                                                                                        GraphData = {GraphData} 
                                                                                        globalDate    = {appData.globalDate}
                                                                                        Key           = {Key + 'team'}
                                                                                        displayLoader = {this.state.displayLoader} /> }
                                                    <hr /> <br />
                                                    <h4 className="card-body-title"> INDIVIDUAL </h4>
                                                    { !GraphData ? <p> Loading </p> : <IndividualLinegraphRenderer 
                                                                                        IndividualGraphData = {GraphData.individualGraphData} 
                                                                                        globalDate          = {appData.globalDate} 
                                                                                        Key                 = {Key + 'individual'}
                                                                                        displayLoader       = {this.state.displayLoader} /> }
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