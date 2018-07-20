import React, { Component } from 'react';
import moment from 'moment-timezone';

var LineChart = require("react-chartjs").Line;

export default class Linegraph extends Component {

    constructor(props) {
        super(props);

        // var chartOptions = {
        //     legend: {
        //         display: true
        //     }
        // };

        var data = this.props.data;
        this.state = {
            data: this.props.data,
            width: 'width' in this.props ? this.props.width : '466',
            heigth: 'height' in this.props ? this.props.height : '250',
            renderData: 'renderData' in this.props ? this.props.renderData : () => { console.log('no renderData in linegraph obj') }
        }

        this.renderData = this.state.renderData.bind(this);
    }

    render() {
        const chartData = this.renderData();

        return (
            <div> 
                <LineChart data = { chartData } width = { this.state.width } height = { this.state.heigth }
                />
            </div>
        )
    }
}