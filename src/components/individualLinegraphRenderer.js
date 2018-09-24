import React, { Component } from 'react';
import moment from 'moment-timezone';
import _ from 'lodash';

import CardComponent from './cardComponent'
import Linegraph from './linegraph'

export default class IndividualLinegraphRenderer extends Component {
    constructor(props){
        super(props);
        this.renderData = this.renderData.bind(this);
    }

	renderData(data, globalDate) {
        return  _.find(data, function(o) {return o.dayKey === globalDate}); 
	}

    filterIndividualProductivity(individualProductivity, globalDate) {
        let filteredProductivity = individualProductivity.map((userIndex) => {
            let productivity = _.filter(userIndex.productivity, function(o) { return o.series.Goal.length || o.series.Production.length })
            let dayKeys = productivity.map((index) => { return index.dayKey })

            if (dayKeys.indexOf(globalDate) >= 0) {
                return userIndex;
            } else {
                return null;
            }
        })

        return _.filter(filteredProductivity, function(item) { return item; });
    }

    renderLinegraphs (IndividualGraphData, globalDate, key) {
        let filteredData = this.filterIndividualProductivity(IndividualGraphData, globalDate);
    	//ordering all production data in groups of 2
    	var groups = _.map(filteredData, function(item, index){
		    return index % 2 === 0 ? filteredData.slice(index, index + 2) : null; 
		    })
		    .filter(function(item){ return item; })

    	return groups.map((group, index) => {
    		if (group.length > 1) {
    			return (
		        	<div key={group[0].email} className="row" style={{ marginBottom: '25px'}}>
			        	<CardComponent maxWidth="45%" columnClassname="col-lg-6 individualLineGraph" title={group[0].email} description="Today's production" body="these are some stats">
			        		<Linegraph  width="500" height="280" renderData={ this.renderData(group[0].productivity, globalDate) } displayLoader = {this.props.displayLoader} onClick={() => this.props.onClick(group[0].email)}/>
			        	</CardComponent>
			        	<CardComponent maxWidth="45%" columnClassname="col-lg-6 individualLineGraph" title={group[1].email} description="Today's production" body="these are some stats">
			        		<Linegraph  width="500" height="280" renderData={this.renderData(group[1].productivity, globalDate) } displayLoader = {this.props.displayLoader} onClick={() => this.props.onClick(group[1].email)}/>
			        	</CardComponent>
		        	</div>
    			)
    		} else {
    			return (
		        	<div key={group[0].email} className="row" style={{ marginBottom: '20px'}}>
			        	<CardComponent maxWidth="45%" columnClassname="col-lg-6 individualLineGraph" title={group[0].email} description="Today's production" body="these are some stats">
			        		<Linegraph  width="500" height="280" renderData={this.renderData(group[0].productivity, globalDate) } displayLoader = {this.props.displayLoader} onClick={() => this.props.onClick(group[0].email)}/>
			        	</CardComponent>
		        	</div>
    			)
    		}
    	})
    }

	render() {
        const { IndividualGraphData, globalDate, key } = this.props;
		return (
				<div>
                    { !IndividualGraphData ? <p> Loading </p> : this.renderLinegraphs(IndividualGraphData, globalDate, key) }
				</div>	
				)
	}	
}