import React, { Component } from 'react';

var RadarChart = require("react-chartjs").Radar;

export default class Radargraph extends Component {

	constructor(props) {
		super(props);

        this.state = {
            width: 'width' in this.props ? this.props.width : '466',
            heigth: 'height' in this.props ? this.props.height : '250',
            renderData: 'renderData' in this.props ? this.props.renderData : () => { console.log('no renderData in linegraph obj') }
        }
	}

	render() {
        return (
            <div>
                {
                    this.props.displayLoader ? <div style={{ position: 'absolute', left: '50%', top: '50%' }}>
                                                    <div className="graphsLoader"></div>
                                               </div> :
                    !this.props.renderData ?
                    <p> No data to load... </p> 
                    : <RadarChart data = { this.props.renderData } width = { this.state.width } height = { this.state.heigth } redraw />
                }
            </div>
        )
	}
}
