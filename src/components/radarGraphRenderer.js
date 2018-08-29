import React, { Component } from 'react';

import Radargraph from './radargraph'
import CardComponent from './cardComponent'

import dataTypes from './dataTypes'

export default class radarGraphRenderer extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
		        	<div className="row" style={{ marginBottom: '20px'}}>
			        	<CardComponent maxWidth="45%" columnClassname="col-lg-6" title={"Tag distribution"} description="Today's production" body="these are some stats">
			        		<Radargraph  width="500" height="280" />
			        	</CardComponent>
		        	</div>
			)
	}

}