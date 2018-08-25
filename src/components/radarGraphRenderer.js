import React, { Component } from 'react';

import Radargraph from './radargraph'

export default class radarGraphRenderer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		        	<div key={group[0].email} className="row" style={{ marginBottom: '20px'}}>
			        	<CardComponent maxWidth="45%" columnClassname="col-lg-6 individualLineGraph" title={group[0].email} description="Today's production" body="these are some stats">
			        		<Radargraph  width="500" height="280" renderData={this.renderData(group[0].productivity, globalDate) }/>
			        	</CardComponent>
		        	</div>
			)
	}

}