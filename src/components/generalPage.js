import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { getLinegraphData } from '../actions';

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
		console.log('general page props', this.props)
		const programName = this.props.data.programData.settings.prettyName;
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
			        	<div className="row" style={{ marginBottom: '20px' }}>
				        	<CardComponent maxWidth="45%" marginLeft='30px' size="col-lg-6" title="Daniel Lesage" description="Tags used the last 24 hrs" body="these are some stats" >
				        		<Linegraph  width="500" height="280" data={ this.state.dataTypes.linegraph2 } />
				        	</CardComponent>
				        	<CardComponent maxWidth="45%" marginLeft='30px' size="col-lg-6" title="Eunice Rodriguez" description="Tags used the last 24 hrs" body="these are some stats" >
				        		<Linegraph  width="500" height="280" data={ this.state.dataTypes.linegraph2 } />
				        	</CardComponent>
			        	</div>
			        	<div className="row" style={{ marginBottom: '20px' }}>
				        	<CardComponent maxWidth="45%" marginLeft='30px' size="col-lg-6" title="Edgar Poe" description="Tags used the last 24 hrs" body="these are some stats" >
				        		<Linegraph  width="500" height="280" data={ this.state.dataTypes.linegraph2 } />
				        	</CardComponent>
				        	<CardComponent maxWidth="45%" marginLeft='30px' size="col-lg-6" title="Ernest Hemmingway" description="Tags used the last 24 hrs" body="these are some stats" >
				        		<Linegraph  width="500" height="280" data={ this.state.dataTypes.linegraph2 } />
				        	</CardComponent>
			        	</div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Generalpage);