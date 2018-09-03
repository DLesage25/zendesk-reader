import React, { Component } from 'react';

import CardComponent from './cardComponent'
import Linegraph from './linegraph'

import Radargraph from './radargraph'

import dataTypes from './dataTypes'

export default class TeamLinegraphRenderer extends Component {
    constructor(props){
        super(props);
        this.renderData = this.renderData.bind(this);
        this.changeModalState = this.changeModalState.bind(this);
    }

    renderData(data, globalDate) {
        return _.find(data, function(o) {return o.dayKey === globalDate});
    }

    changeModalState(event) {
        if(this.props.onClick) this.props.onClick(event);
    }

    renderLinegraphs (GraphData, globalDate, Key) {
        let {
            queueData,
            teamGraphData,
            tagData
        } = GraphData;
        return (
                <div style={{ marginBottom:'40px' }}>
                    <div className="row" style={{ marginBottom: '40px' }} id="hourlyThroughputChart">
                        <CardComponent columnClassname="col-lg-12" title="Hourly throughput" description="Actual vs expected performance" body="these are some stats">
                            <Linegraph width="1000" height="280" renderData={ this.renderData(teamGraphData, globalDate) } onClick={(event) => {this.changeModalState(event)}}/>
                        </CardComponent>
                    </div>
                    <div className="row" style={{ marginBottom: '20px' }}>
                        <CardComponent maxWidth="45%" columnClassname="col-lg-6 individualLineGraph" title="Queue volume" description="Today's incoming ticket volume" body="these are some stats" id="queueVolumeChart">
                            <Linegraph  width="500" height="280" renderData={ this.renderData(queueData, globalDate) } />
                        </CardComponent>
                        <CardComponent maxWidth="45%" columnClassname="col-lg-6 individualLineGraph" title={"Tag distribution"} description="Today's production" body="these are some stats">
                            <Radargraph  width="500" height="280" renderData={ this.renderData(tagData, globalDate) } />
                        </CardComponent>
                    </div>
                </div>
            )
    }

	render() {
        const { GraphData, globalDate, Key } = this.props;
		return (
				<div>
                    { !GraphData ? <p> No graph data in TeamLinegraphRenderer </p> : this.renderLinegraphs(GraphData, globalDate, Key) }
				</div>	
				)
	}	
}
