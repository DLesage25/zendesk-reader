import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import moment from 'moment-timezone';
import _ from 'lodash';

import { filterIndividualProductivity } from '../actions';

import CardComponent from './cardComponent'
import Linegraph from './linegraph_individual'

class IndividualLinegraphRenderer extends Component {
    constructor(props){
        super(props);
        this.state = {
        	globalDate: 'GlobalDate' in this.props ? this.props.GlobalDate : moment().format('MM_DD_YY')
        };
    }

    componentWillMount() {
        if (!this.props.FilteredIndividualProductivity) this.props.filterIndividualProductivity(this.props.GraphData, this.props.GlobalDate);	
    }

    componentDidUpdate(){
        console.log('componentDidUpdate IndividualLinegraphRenderer', this.props);
    }

	renderData() {
        let props = this.props;
        let data = props.GraphData;
        let selectedData = _.find(data, function(o) {return o.dayKey === props.globalDate})
        return selectedData; 
	}

    renderLinegraphs ({data}, GlobalDate) {
    	//ordering all production data in groups of 2
    	var groups = _.map(data, function(item, index){
		    return index % 2 === 0 ? data.slice(index, index + 2) : null; 
		    })
		    .filter(function(item){ return item; })

    	return groups.map((group) => {
    		if (group.length > 1) {
    			return (
		        	<div key={group[0].email} className="row" style={{ marginBottom: '20px' }}>
			        	<CardComponent maxWidth="45%" marginLeft='30px' size="col-lg-6" title={group[0].email} description="Today's production" body="these are some stats" >
			        		<Linegraph  width="500" height="280" GraphData={ group[0].productivity } renderData={this.renderData } globalDate={GlobalDate} />
			        	</CardComponent>
			        	<CardComponent maxWidth="45%" marginLeft='30px' size="col-lg-6" title={group[1].email} description="Today's production" body="these are some stats" >
			        		<Linegraph  width="500" height="280" GraphData={ group[1].productivity } renderData={this.renderData } globalDate={GlobalDate} />
			        	</CardComponent>
		        	</div>
    			)
    		} else {
    			return (
		        	<div key={group[0].email} className="row" style={{ marginBottom: '20px' }}>
			        	<CardComponent maxWidth="45%" marginLeft='30px' size="col-lg-6" title={group[0].email} description="Today's production" body="these are some stats" >
			        		<Linegraph  width="500" height="280" GraphData={ group[0].productivity } renderData={this.renderData } globalDate={GlobalDate} />
			        	</CardComponent>
		        	</div>
    			)
    		}
    	})
    }

	render() {
        const { FilteredIndividualProductivity, GlobalDate } = this.props;
		return (
				<div>
                    { !FilteredIndividualProductivity ? <p> Loading </p> : this.renderLinegraphs(FilteredIndividualProductivity, GlobalDate) }
				</div>	
				)
	}	
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        filterIndividualProductivity : filterIndividualProductivity
    }, dispatch);
}

function mapStateToProps(state){
    const {
  		startupData,
		filteredIndividualProductivity
    } = state;
    return { 
        GlobalDate : startupData.globalDate,
        FilteredIndividualProductivity: filteredIndividualProductivity
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(IndividualLinegraphRenderer);