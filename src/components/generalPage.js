import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import moment from 'moment';

import { getLinegraphData,
        changeGlobalDate } from '../actions';

import IndividualLinegraphRenderer from './individualLinegraphRenderer'
import TeamLinegraphRenderer from './teamLinegraphRenderer'
import ProductivityCard from './productivityCard'
import CardComponent from './cardComponent'
import Table from './table3'
import Linegraph from './linegraph'
import Linegraph2 from './linegraph_individual'
import Radargraph from './radarGraph'
import Bargraph from './barGraph' 
import dataTypes from './dataTypes'



class Generalpage extends Component {

    constructor(props){
        super(props);

        this.state = {
            globalDate: 'globalDate' in this.props.appData ? this.props.appData.globalDate : moment().format('mm/d/yyyy')
        };

        this.state.dataTypes = dataTypes;

        if (!this.props.GraphData) this.props.getLinegraphData(this.props.appData.programData, this.props.appData.productivityData)
        //if (!this.props.GlobalDate) this.props.changeGlobalDate(this.props.appData.globalDate)
        this.changeGlobalDate2 = this.changeGlobalDate2.bind(this);
    }

    changeGlobalDate2(newDate) {
        console.log('changeGlobalDate2', newDate)
        this.setState({globalDate: newDate})
    }

    getDateList(productivityData){
        return Object.keys(productivityData).reverse();
    }

	render() {
        console.log('general props', this.props);
        console.log('general state', this.state);
        const { appData, GraphData } = this.props;
		return (
		    	<div className="col-large" style={{ marginTop: '70px', width: '100%' }}>
		      		    { !appData      ? <p> Loading </p> : <ProductivityCard title={appData.programData.settings.prettyName} globalDate={this.state.globalDate} dateList={this.getDateList(appData.productivityData)} changeGlobalDate={this.changeGlobalDate2}> 
    			    		{ !GraphData ? <p> Loading </p> : <TeamLinegraphRenderer GraphData={this.props.GraphData} globalDate={this.state.globalDate} /> }
    			    		{ !GraphData ? <p> Loading </p> : <IndividualLinegraphRenderer GraphData={this.props.GraphData.individualGraphData}/> }
			        	    <hr />
		      		</ProductivityCard> }
		    	</div>
				)
	}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getLinegraphData : getLinegraphData,
        changeGlobalDate : changeGlobalDate
    }, dispatch);
}

function mapStateToProps(state){
    console.log('incoming general state', {state})
    const {
        graphData,
        globalDate
    } = state;
    return { 
        GraphData : graphData,
        GlobalDate: globalDate
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Generalpage);