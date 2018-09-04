import React, { Component } from 'react';

var LineChart = require("react-chartjs").Line;

export default class Linegraph extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            width: 'width' in this.props ? this.props.width : '466',
            heigth: 'height' in this.props ? this.props.height : '250',
            renderData: 'renderData' in this.props ? this.props.renderData : () => { console.log('no renderData in linegraph obj') }
        }
        this.onClickFunction = this.onClickFunction.bind(this);
    }

    onClickFunction (event) {
        if(this.props.onClick) this.props.onClick(event);
    };

    shouldComponentUpdate(nextProps) {
        if(nextProps.renderData == this.props.renderData) return false;
        return true;
    }

    render() {
        return (
            <div>
                {
                    !this.props.renderData ?
                    <p> No data to load... </p> 
                    : <LineChart data = { this.props.renderData } width = { this.state.width } height = { this.state.heigth } onClick={(event) => this.onClickFunction(event)} redraw />
                }
            </div>
        )
    }
}