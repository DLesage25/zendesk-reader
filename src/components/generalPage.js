import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import moment from 'moment';

import { getLinegraphData } from '../actions';

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
            globalDate: 'globalDate' in this.props.appData ? this.props.appData.globalDate : moment().format('mm/dd/yyyy')
        };

        if (!this.props.GraphData) this.props.getLinegraphData(this.props.appData.programData, this.props.appData.productivityData)

        this.changeGlobalDate = this.changeGlobalDate.bind(this);
    }

    changeGlobalDate(newDate) {
        this.setState({globalDate: newDate})
    }

    getDateList(productivityData){
        return Object.keys(productivityData).reverse();
    }

	render() {
        const { appData, GraphData } = this.props;
		return (
		    	<div className="col-large" style={{ marginTop: '70px', width: '100%' }}>
		      		    { !appData      ? <p> Loading </p> : <ProductivityCard title={appData.programData.settings.prettyName} globalDate={this.state.globalDate} dateList={this.getDateList(appData.productivityData)} changeGlobalDate={this.changeGlobalDate}>
                            <h4 className="card-body-title"> Team </h4> 
    			    		{ !GraphData ? <p> Loading </p> : <TeamLinegraphRenderer GraphData={this.props.GraphData} globalDate={this.state.globalDate} /> }
                            <hr />
                            <h4 className="card-body-title"> Individual </h4>
    			    		{ !GraphData ? <p> Loading </p> : <IndividualLinegraphRenderer GraphData={this.props.GraphData.individualGraphData} globalDate={this.state.globalDate}/> }
		      		</ProductivityCard> }
		    	</div>
				)
	}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getLinegraphData : getLinegraphData
    }, dispatch);
}

function mapStateToProps(state){
    const {
        graphData
    } = state;
    return { 
        GraphData : graphData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Generalpage);