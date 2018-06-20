import React, { Component } from 'react';

var LineChart = require("react-chartjs").Line;

export default class Linegraph extends Component {

	constructor(props) {
		super(props);

		var chartOptions = {


			legend: {
				display : true	
			}
			// {% endraw %}

			// //Boolean - Whether to horizontally center the label and point dot inside the grid
			// offsetGridLines : false
		};

		this.state = {
			data: this.props.data,
			width: 'width' in this.props ? this.props.width: '466',
			heigth: 'height' in this.props ? this.props.height: '250'
			//chartOptions: chartOptions
		}
	}

	render() {
		return (
			<LineChart data={ this.state.data } width={ this.state.width } height={ this.state.heigth }/>
		)
	}
}
