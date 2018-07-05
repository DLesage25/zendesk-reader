import React, { Component } from 'react';
import moment from 'moment-timezone';

import CardComponent from './cardComponent'
import Linegraph from './linegraph_individual'
import dataTypes from './dataTypes'

class IndividualLinegraphRenderer extends Component {

    constructor(props){
        super(props);

        this.state = {};
        this.state.individualProductivity = this.props.individualProductivity;

    }

	renderData() {
        let data = this.props.data;
        return data[data.length - 1]; //returning last record for now

	}

    renderLinegraphs () {

    	let individualProductivity = this.props.individualProductivity;

    	var groups = _.map(individualProductivity, function(item, index){
		    return index % 2 === 0 ? individualProductivity.slice(index, index + 2) : null; 
		    })
		    .filter(function(item){ return item; 
		});

    	return groups.map((group) => {
    		if (group.length > 1) {
    			return (
		        	<div key={group[0].email} className="row" style={{ marginBottom: '20px' }}>
			        	<CardComponent maxWidth="45%" marginLeft='30px' size="col-lg-6" title={group[0].email} description="Today's production" body="these are some stats" >
			        		<Linegraph  width="500" height="280" data={ group[0].productivity } renderData={this.renderData } />
			        	</CardComponent>
			        	<CardComponent maxWidth="45%" marginLeft='30px' size="col-lg-6" title={group[1].email} description="Today's production" body="these are some stats" >
			        		<Linegraph  width="500" height="280" data={ group[1].productivity } renderData={this.renderData } />
			        	</CardComponent>
		        	</div>
    			)
    		} else {
    			return (
		        	<div key={group[0].email} className="row" style={{ marginBottom: '20px' }}>
			        	<CardComponent maxWidth="45%" marginLeft='30px' size="col-lg-6" title={group[0].email} description="Today's production" body="these are some stats" >
			        		<Linegraph  width="500" height="280" data={ group[0].productivity } renderData={this.renderData } />
			        	</CardComponent>
		        	</div>
    			)
    		}
    	})
    }

	render() {
		return (
				<div>
                    {this.renderLinegraphs()}
				</div>	
				)
	}	
}

export default IndividualLinegraphRenderer;