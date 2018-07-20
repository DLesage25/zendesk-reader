import React, { Component } from 'react';
import { connect }            from 'react-redux';

import moment from 'moment-timezone';

import CardComponent from './cardComponent'
import Linegraph from './linegraph_individual'
import dataTypes from './dataTypes'

class TeamLinegraphRenderer extends Component {
    constructor(props){
        super(props);
        this.state = {
        	globalDate: 'GlobalDate' in this.props ? this.props.GlobalDate : moment().format('MM_DD_YY'),
            dataTypes: dataTypes
        };
    }

    renderData() {
        let props = this.props;
        let data = props.data;
        let selectedData = _.find(data, function(o) {return o.dayKey === props.globalDate})
        console.log({selectedData})
        return selectedData; 
    }

    //to-do: add renderdata to both team lgs and figure out if oth would require the same function

    renderLinegraphs (GraphData, GlobalDate) {
        let {
            queueData,
            teamGraphData
        } = GraphData;
        return (
                <div>
                    <div className="row" style={{ marginBottom: '20px' }}>
                        <CardComponent marginLeft='30px' size="col-lg-12" title="Team Performance" description="Actual vs expected performance" body="these are some stats" >
                            <Linegraph width="1000" height="280" data={ teamGraphData } renderData={this.renderData } globalDate={GlobalDate} />
                        </CardComponent>
                    </div>
                    <div className="row" style={{ marginBottom: '20px' }}>
                        <CardComponent marginLeft='30px' size="col-lg-12" title="Queue volume" description="Today's incoming ticket volume" body="these are some stats" >
                            <Linegraph  width="1000" height="280" data={ queueData } renderData={this.renderData } globalDate={GlobalDate} />
                        </CardComponent>
                    </div>
                </div>
            )
    }

	render() {
		console.log('teamlinegraph', this.props)
        const { GraphData, GlobalDate } = this.props;
		return (
				<div>
                    { !GraphData ? <p> No graph data in TeamLinegraphRenderer </p> : this.renderLinegraphs(GraphData, GlobalDate) }
				</div>	
				)
	}	
}

function mapStateToProps(state){
    const {
        startupData
    } = state;
    return { 
        GlobalDate : startupData.globalDate,
        SelectedProgram : startupData.selectedProgram,
    };
}

export default connect(mapStateToProps)(TeamLinegraphRenderer);
