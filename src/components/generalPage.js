import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { getLinegraphData } from '../actions';

import IndividualLinegraphRenderer from './individualLinegraphRenderer'
import TeamLinegraphRenderer from './teamLinegraphRenderer'

import Card from './card'
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

        this.state = {};
        this.state.dataTypes = dataTypes;

        if (!this.props.GraphData) this.props.getLinegraphData(this.props.data.programData)

    }

    componentDidUpdate(){
    }

	render() {
        const { data, GraphData } = this.props;
		const programName = data.programData.settings.prettyName;
		return (
		    	<div className="col-large" style={{ marginTop: '70px', width: '100%' }}>
		      		<Card title={programName}>

			    		{ !GraphData ? <p> Loading </p> : <TeamLinegraphRenderer GraphData={this.props.GraphData}/> }
			    		{ !GraphData ? <p> Loading </p> : <IndividualLinegraphRenderer GraphData={this.props.GraphData.individualGraphData}/> }
			        	
			        	<hr />
		      		</Card>
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