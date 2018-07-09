import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { getLinegraphData } from '../actions';

import IndividualLinegraphRenderer from './individualLinegraphRenderer'

import Card from './card'
import CardComponent from './cardComponent'
import Table from './table3'
import Linegraph from './linegraph'
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
        console.log('componentDidUpdate general', this.props);
    }

	render() {
        const { data, GraphData } = this.props;
		const programName = data.programData.settings.prettyName;
		return (
		    	<div className="col-large" style={{ marginTop: '100px', width: '100%' }}>
		      		<Card title={programName}>
					   <div className="row" style={{ marginBottom: '20px' }}>
				        	<CardComponent marginLeft='30px' size="col-lg-12" title="Team Performance" description="The incoming volume for the last 24 hrs" body="these are some stats" >
				        		<Linegraph width="1000" height="280" data={ this.state.dataTypes.linegraph3 } />
				        	</CardComponent>
			        	</div>
					   <div className="row" style={{ marginBottom: '20px' }}>
				        	<CardComponent marginLeft='30px' size="col-lg-12" title="Queue volume" description="The incoming volume for the last 24 hrs" body="these are some stats" >
				        		<Linegraph  width="1000" height="280" data={ this.state.dataTypes.linegraph1 } />
				        	</CardComponent>
			        	</div>

			    		{ !GraphData ? <p> Loading </p> : <IndividualLinegraphRenderer individualProductivity={this.props.GraphData.individualGraphData}/> }
			        	
			        	<hr />
			        	<div className="row">
				        	<CardComponent marginLeft='30px' size="col-lg-6" title="Tag distribution" description="Tags used the last 24 hrs" body="these are some stats" >
								<Radargraph />
				        	</CardComponent>
			        	</div>
			        	<hr />
			        	<div className="row">
			        		<CardComponent divHeight="" size="col-lg-12" title="Performance" marginBottom="" description="Updated until Wednesday @5PM CST" body="these are some stats" > 
			        			<Table />
			        		</CardComponent>
			        	</div>
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