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

import DrilldownModal from './drilldownModal'

class Generalpage extends Component {

    constructor(props){
        super(props);

        this.state = {
            appData       : 'appData' in this.props ? this.props.appData: null,
            lastFetch     : null,
            Key           : Math.random(),
            displayLoader : false,
            modalState    : false,
            modalData     : [{
                                name: 'Tanner Linsley',
                                loggedTime: '01:13:00',
                                production: {
                                  publicComments: 5,
                                  goal: {
                                    type: 'publicComments',
                                    value: 10
                                  },
                                  solved: 23,
                                  pending: 15,
                                  open: 0
                                }
                              },{
                                name: 'John Doe',
                                loggedTime: '02:25:00',
                                production: {
                                  publicComments: 21,
                                  goal: {
                                    type: 'publicComments',
                                    value: 23
                                  },
                                  solved: 31,
                                  pending: 6,
                                  open: 3
                                }
                            }]
        };

        this.changeGlobalDate = this.changeGlobalDate.bind(this);
        this.changeGlobalProgram = this.changeGlobalProgram.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.checkIfFetch = this.checkIfFetch.bind(this);
        this.changeLoaderDisplay = this.changeLoaderDisplay.bind(this);
        this.changeModalState = this.changeModalState.bind(this);
    }

    componentWillMount() {
        this.props.getLinegraphData(this.props.appData.globalProgram, this.props.appData.productivityData)
    }

    componentDidUpdate(prevProps, prevState) {
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

        if((isRefresh || newProgramName !== currentProgramName) && timeSinceLastFetch > 5) {
            let newAppData = {
                ...this.props.appData,
                appSettings: FetchProgram.appSettings,
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
        this.setState(newState)
    }

    changeGlobalProgram(newProgram) {
        this.changeLoaderDisplay();
        this.props.fetchProgram(newProgram, this.state.appData, false, () => { this.changeLoaderDisplay(true) });
    }

    refreshData() {
        this.changeLoaderDisplay();
        this.props.fetchProgram(this.state.appData.globalProgram.settings.prettyName, this.state.appData, true, () => {this.changeLoaderDisplay(true)});
    }

    getDateList(productivityData){
        return Object.keys(productivityData).reverse();
    }

    changeModalState(event) {
        this.setState({
            modalState: !this.state.modalState
        })
    }



	render() {
        const { GraphData } = this.props;
        const { appData, lastFetch, Key, displayLoader } = this.state;
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
                                                    displayLoader       = {displayLoader}
                                                    lastFetch           = {lastFetch}
                                                     >

                                                    <h4 className="card-body-title"> TEAM </h4> 
                                                    { !GraphData ? <p> Loading </p> : <TeamGraphRenderer 
                                                                                        GraphData = {GraphData} 
                                                                                        globalDate    = {appData.globalDate}
                                                                                        Key           = {Key + 'team'}
                                                                                        onClick       = {(event) => this.changeModalState(event)} /> }
                                                    <hr /> <br />
                                                    <h4 className="card-body-title"> INDIVIDUAL </h4>
                                                    { !GraphData ? <p> Loading </p> : <IndividualLinegraphRenderer 
                                                                                        IndividualGraphData = {GraphData.individualGraphData} 
                                                                                        globalDate          = {appData.globalDate} 
                                                                                        Key                 = {Key + 'individual'} /> }
                                                    <DrilldownModal
                                                       open={this.state.modalState}
                                                       onClose={(event) => this.changeModalState(event)}
                                                       modalData={this.state.modalData}>
                                                    </DrilldownModal>
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