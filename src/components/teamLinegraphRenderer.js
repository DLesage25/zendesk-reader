import React, { Component } from 'react';

import CardComponent from './cardComponent'
import Linegraph from './linegraph'

import Radargraph from './radargraph'

import dataTypes from './dataTypes'

export default class TeamLinegraphRenderer extends Component {
    constructor(props){
        super(props);
        this.renderData = this.renderData.bind(this);
    }

    renderData(data, globalDate) {
        return _.find(data, function(o) {return o.dayKey === globalDate});
    }

    renderLinegraphs (TeamGraphData, globalDate, Key) {
        let {
            queueData,
            teamGraphData
        } = TeamGraphData;
        return (
                <div style={{ marginBottom:'40px' }}>
                    <div className="row" style={{ marginBottom: '30px' }} id="hourlyThroughputChart">
                        <CardComponent columnClassname="col-lg-12" title="Hourly throughput" description="Actual vs expected performance" body="these are some stats">
                            <Linegraph width="1000" height="280" renderData={ this.renderData(teamGraphData, globalDate) } />
                        </CardComponent>
                    </div>
                    <div className="row" style={{ marginBottom: '20px' }}>
                        <CardComponent maxWidth="45%" columnClassname="col-lg-6 individualLineGraph" title="Queue volume" description="Today's incoming ticket volume" body="these are some stats" id="queueVolumeChart">
                            <Linegraph  width="500" height="280" renderData={ this.renderData(queueData, globalDate, true) } />
                        </CardComponent>
                        <CardComponent maxWidth="45%" columnClassname="col-lg-6 individualLineGraph" title={"Tag distribution"} description="Today's production" body="these are some stats">
                            <Radargraph  width="500" height="280" />
                        </CardComponent>
                    </div>
                </div>
            )
    }

	render() {
        const { TeamGraphData, globalDate, Key } = this.props;
		return (
				<div>
                    { !TeamGraphData ? <p> No graph data in TeamLinegraphRenderer </p> : this.renderLinegraphs(TeamGraphData, globalDate, Key) }
				</div>	
				)
	}	
}
