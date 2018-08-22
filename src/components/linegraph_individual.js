import React, { Component } from 'react';

var LineChart = require("react-chartjs").Line;

export default class Linegraph extends Component {
    constructor(props) {
        super(props);

        var chartOptions = {
            legend: {
                display: true
            },
            //String - A legend template
            legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>"
        };
        
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
                    !this.props.renderData ?
                    <p> No data to load... </p> 
                    : <LineChart data = { this.props.renderData } width = { this.state.width } height = { this.state.heigth } options={this.chartOptions} />
                }
            </div>
        )
    }
}