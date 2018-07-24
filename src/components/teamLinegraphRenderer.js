import React, { Component } from 'react';

import CardComponent from './cardComponent'
import Linegraph from './linegraph_individual'

export default class TeamLinegraphRenderer extends Component {
    constructor(props){
        super(props);

        this.renderData = this.renderData.bind(this);
    }

    renderData(data) {
        let globalDate = this.props.globalDate;
        return _.find(data, function(o) {return o.dayKey === globalDate});
    }

    renderLinegraphs (GraphData, globalDate) {
        let {
            queueData,
            teamGraphData
        } = GraphData;
        return (
                <div style={{ marginBottom:'40px' }}>
                    <div className="row" style={{ marginBottom: '20px' }}>
                        <CardComponent marginLeft='30px' size="col-lg-12" title="Hourly throughput" description="Actual vs expected performance" body="these are some stats" >
                            <Linegraph width="1000" height="280" data={ teamGraphData } renderData={this.renderData } globalDate={globalDate} />
                        </CardComponent>
                    </div>
                    <div className="row" style={{ marginBottom: '20px' }}>
                        <CardComponent marginLeft='30px' size="col-lg-12" title="Queue volume" description="Today's incoming ticket volume" body="these are some stats" >
                            <Linegraph  width="1000" height="280" data={ queueData } renderData={this.renderData } globalDate={globalDate} />
                        </CardComponent>
                    </div>
                </div>
            )
    }

	render() {
        const { GraphData, globalDate } = this.props;
		return (
				<div>
                    { !GraphData ? <p> No graph data in TeamLinegraphRenderer </p> : this.renderLinegraphs(GraphData, globalDate) }
				</div>	
				)
	}	
}
