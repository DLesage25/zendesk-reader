import React, { Component } from 'react';

import CardComponent from './cardComponent'

export default class Card extends Component {
    constructor(props){
        super(props);

        this.state = {
            //value          : 'selected' in this.props ? this.props.selected : false,
            title           : 'title' in this.props ? this.props.title: 'Card title',
            focused_btn    : false,
            focused_choice : false,
            icon : 'icon' in this.props ? this.props.icon : 'fa fa-check-square-o',
            text: 'text' in this.props ? this.props.text : '<default text>'
        };

    }

	render() {
		return (
				<section className="card">
				    <div className="card-header">
				        <span className="cat__core__title">
				            <strong> { this.state.title } </strong>
				            <a className="btn btn-sm btn-primary ml-2" href="http://www.chartjs.org/" target="_blank">Refresh <i className="icmn-link ml-1"></i></a>
				        </span>
				    </div>
				    <div className="card-body">
				    	{this.props.children}
				    </div>
				</section>
		)
	}


}