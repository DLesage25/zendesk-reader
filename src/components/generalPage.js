import React, { Component } from 'react';

import Card from './card'
import CardComponent from './cardComponent'
import Table from './table'
import Linegraph from './linegraph'
import Radargraph from './radarGraph'

export default class Generalpage extends Component {

    constructor(props){
        super(props);

    }

	render() {
		return (
			    <div className = 'row' style = {{ height:'100%'}} >
			    	<div className="col-large" style={{ marginTop: '100px', width: '100%' }}>
			      		<Card title="PartnerHero-Udemy">
						   <div className="row">
					        	<CardComponent size="col-lg-6" title="Queue volume" description="The incoming volume for the last 24 hrs" body="these are some stats" >
					        		<Linegraph />
					        	</CardComponent>
					        	<CardComponent size="col-lg-6" title="Tag breakdown" description="Tags used the last 24 hrs" body="these are some stats" >
									<Radargraph />
					        	</CardComponent>
				        	</div>
				        	<div className="row">
				        		<CardComponent size="col-lg-12" title="View volume" description="Updated until Wednesday @5PM CST" body="these are some stats" > 
				        			<Table />
				        		</CardComponent>
				        	</div>
			      		</Card>
			    	</div>
		  		</div>
				)
	}
}