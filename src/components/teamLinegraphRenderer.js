import React, { Component } from 'react';

import CardComponent from './cardComponent'
import Linegraph from './linegraph_individual'

export default class TeamLinegraphRenderer extends Component {
    constructor(props){
        super(props);
        this.renderData = this.renderData.bind(this);
    }

    renderData(data, globalDate, log) {
        if(log) console.log({data})
        return _.find(data, function(o) {return o.dayKey === globalDate});
    }

    renderLinegraphs (TeamGraphData, globalDate, Key) {
        let {
            queueData,
            teamGraphData
        } = TeamGraphData;
        console.log({queueData})
        return (
                <div style={{ marginBottom:'40px' }}>
                    <div className="row" style={{ marginBottom: '30px' }} id="hourlyThroughputChart">
                        <CardComponent size="col-lg-12" title="Hourly throughput" description="Actual vs expected performance" body="these are some stats">
                            <Linegraph width="1000" height="280" renderData={ this.renderData(teamGraphData, globalDate) } />
                        </CardComponent>
                    </div>
                    <div className="row" style={{ marginBottom: '20px' }} id="queueVolumeChart">
                        <CardComponent size="col-lg-12" title="Queue volume" description="Today's incoming ticket volume" body="these are some stats">
                            <Linegraph  width="1000" height="280" renderData={ this.renderData(queueData, globalDate, true) } />
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
