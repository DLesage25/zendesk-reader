import React, { Component } from 'react';

import Card from './card'
import CardComponent from './cardComponent'
import Table from './table3'
import Linegraph from './linegraph'
import Radargraph from './radarGraph'
import Bargraph from './barGraph' 
import dataTypes from './dataTypes'

export default class Generalpage extends Component {

    constructor(props){
        super(props);

        this.state = {};
        this.state.dataTypes = dataTypes;
    }

	render() {
		return (
			    <div className = 'row' style = {{ height:'100%'}} >
			    	<div className="col-large" style={{ marginTop: '100px', width: '100%' }}>
			      		<Card title="PartnerHero-Udemy">
						   <div className="row" style={{ marginBottom: '20px' }}>
					        	<CardComponent marginLeft='30px' size="col-lg-12" title="Performance" description="The incoming volume for the last 24 hrs" body="these are some stats" >
					        		<Linegraph width="1000" height="280" data={ this.state.dataTypes.linegraph2 } />
					        	</CardComponent>
				        	</div>
						   <div className="row" style={{ marginBottom: '20px' }}>
					        	<CardComponent marginLeft='30px' size="col-lg-12" title="Queue volume" description="The incoming volume for the last 24 hrs" body="these are some stats" >
					        		<Linegraph  width="1000" height="280" data={ this.state.dataTypes.linegraph1 } />
					        	</CardComponent>
				        	</div>
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
		  		</div>
				)
	}
}