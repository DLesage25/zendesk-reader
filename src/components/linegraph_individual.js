import React, { Component } from 'react';

var LineChart = require("react-chartjs").Line;

export default class Linegraph extends Component {
    constructor(props) {
        super(props);

        // var chartOptions = {
        //     legend: {
        //         display: true
        //     }
        // };
        
        this.state = {
            data: this.props.data,
            width: 'width' in this.props ? this.props.width : '466',
            heigth: 'height' in this.props ? this.props.height : '250',
            renderData: 'renderData' in this.props ? this.props.renderData : () => { console.log('no renderData in linegraph obj') }
        }
    }

    render() {
        const chartData = this.props.renderData(this.props.data);
        return (
            <div>
                {
                    !chartData ?
                    <p> No data to load... </p> 
                    : <LineChart data = { chartData } width = { this.state.width } height = { this.state.heigth }
                    />
                }
            </div>
        )
    }
}