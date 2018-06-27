import React, { Component } from 'react';
import moment from 'moment-timezone';

var LineChart = require("react-chartjs").Line;

export default class Linegraph extends Component {

    constructor(props) {
        super(props);

        var chartOptions = {
            legend: {
                display: true
            }
        };

        var data = this.props.data;
        // var todayData = data[]

        // var data = {
        //     labels: thi,
        //     datasets: [{
        //             label: "New teacher tickets",
        //             fillColor: "rgba(220,220,220,0.2)",
        //             strokeColor: "rgba(220,220,220,1)",
        //             pointColor: "rgba(220,220,220,1)",
        //             pointStrokeColor: "#fff",
        //             pointHighlightFill: "#fff",
        //             pointHighlightStroke: "rgba(220,220,220,1)",
        //             data: [65, 59, 80, 81, 56, 55, 40, 0, 14, 12]
        //         },
        //         {
        //             label: "New instructor tickets",
        //             fillColor: "rgba(151,187,205,0.2)",
        //             strokeColor: "rgba(151,187,205,1)",
        //             pointColor: "rgba(151,187,205,1)",
        //             pointStrokeColor: "#fff",
        //             pointHighlightFill: "#fff",
        //             pointHighlightStroke: "rgba(151,187,205,1)",
        //             data: [28, 48, 40, 19, 86, 27, 90, 70, 52, 55]
        //         },
        //         {
        //             label: "New student ticktes",
        //             fillColor: "rgb(106,168,148, 0.2)",
        //             strokeColor: "#05583e",
        //             pointColor: "#05583e",
        //             pointStrokeColor: "#fff",
        //             pointHighlightFill: "#fff",
        //             pointHighlightStroke: "rgba(151,187,205,1)",
        //             data: [0, 55, 23, 28, 35, 36, 31, 25, 22, 17]
        //         }
        //     ]
        // };

        this.state = {
            data: this.props.data,
            width: 'width' in this.props ? this.props.width : '466',
            heigth: 'height' in this.props ? this.props.height : '250'
            //chartOptions: chartOptions
        }
    }

    render() {
        return ( <
            LineChart data = { this.state.data } width = { this.state.width } height = { this.state.heigth }
            />
        )
    }
}