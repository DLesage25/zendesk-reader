import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import moment from 'moment';

import { 
        getLinegraphData,
        fetchProgram
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
            appData: 'appData' in this.props     ? this.props.appData: {}
        };

        this.changeGlobalDate = this.changeGlobalDate.bind(this);
        this.changeGlobalProgram = this.changeGlobalProgram.bind(this);
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
        console.log({newProgram})
        this.props.fetchProgram(newProgram, this.props.appData)
        //this.setState(Object.assign(this.state, { globalProgram: newProgram }))
    }

    getDateList(productivityData){
        return Object.keys(productivityData).reverse();
    }

    componentWillMount() {
        this.props.getLinegraphData(this.props.appData.globalProgram, this.props.appData.productivityData)
    }

    componentDidUpdate() {
        const { FetchProgram } = this.props;

        if (!FetchProgram) return true;

        const newProgramName = FetchProgram.globalProgram.settings.id;
        const currentProgramName = this.state.appData.globalProgram.settings.id;

        if(newProgramName !== currentProgramName) {
            let newAppData = {
                ...this.props.appData,
                appSettings: FetchProgram.appSettings,
                globalProgram: FetchProgram.globalProgram,
                productivityData: FetchProgram.productivityData
            }
            this.setState(
                {
                    appData: newAppData
                }, 
                () => { this.props.getLinegraphData(this.state.appData.globalProgram, this.state.appData.productivityData) }
                )
        }
    }

	render() {
        const { FetchProgram, GraphData } = this.props;
        const { appData } = this.state;
        const { changeGlobalProgram, changeGlobalDate, getDateList } = this;

        console.log({GraphData})

		return (
		    	<div className="col-large" style={{ marginTop: '70px', width: '100%' }}>
		      		    { !GraphData  ? <p> Loading </p> : 
                            <ProductivityCard 
                                globalDate          = {appData.globalDate}
                                globalProgram       = {appData.globalProgram}
                                changeGlobalDate    = {changeGlobalDate} 
                                changeGlobalProgram = {changeGlobalProgram}
                                dateList            = {getDateList(appData.productivityData)} 
                                programList         = {appData.appSettings.programList} >

                                <h4 className="card-body-title"> Team </h4> 
    			    		   { !GraphData ? <p> Loading </p> : <TeamLinegraphRenderer 
                                                                    TeamGraphData = {GraphData} 
                                                                    globalDate    = {appData.globalDate} /> }
                                <hr />
                                <h4 className="card-body-title"> Individual </h4>
    			    		   { !GraphData ? <p> Loading </p> : <IndividualLinegraphRenderer 
                                                                    IndividualGraphData = {GraphData.individualGraphData} 
                                                                    globalDate         = {appData.globalDate}/> }

		      		    </ProductivityCard> }
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
        fetchProgram,
        graphData
    } = state;
    return { 
        GraphData : graphData,
        FetchProgram : fetchProgram
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Generalpage);