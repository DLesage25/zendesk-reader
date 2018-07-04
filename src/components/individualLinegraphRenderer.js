import React, { Component } from 'react';

import CardComponent from './cardComponent'
import Linegraph from './linegraph'

class IndividualLinegraphRenderer extends Component {

    constructor(props){
        super(props);

        this.state = {};
        this.state.individualProductivity = this.props.individualProductivity;

    }

    splitIndividualProductivities (individualProductivity) {
    	var groups = _.map(individualProductivity, function(item, index){
		    return index % 2 === 0 ? individualProductivity.slice(index, index + 2) : null; 
		    })
		    .filter(function(item){ return item; 
		});
		return groups;
    }

    renderLinegraphs(groups) {

    	console.log('groups', groups)
    }

    processIndividualProductivity (individualProductivity) {
    	let groupedProductivity = this.splitIndividualProductivities(individualProductivity)
    	this.renderLinegraphs(groupedProductivity);
    }

	render() {
		console.log('IndividualLinegraphRenderer props', this.props)
        this.processIndividualProductivity(this.props.individualProductivity)
		return (
				<div>
					<p> this is a testtttt </p>
				</div>	
				)
	}	
}

export default IndividualLinegraphRenderer;