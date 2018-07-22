import React, { Component } from 'react';

import CardComponent from './cardComponent'
import Dropdown from './dropdown'

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
		const {globalDate, dateList} = this.props;
		return (
				<section className="card">
				    <div className="card-header">
				        <span className="cat__core__title card-title" style={{ fontSize: '18px' }}>
				            <a className="btn btn-sm btn-primary ml-2 dropdown-toggle" href="http://www.chartjs.org/" target="_blank"> { this.state.title } <i className="icmn-link ml-1"></i></a>
				            <Dropdown current={globalDate} options={dateList} />
				        </span>
				    </div>
				    <div className="card-body">
				    	{this.props.children}
				    </div>
				</section>
		)
	}


}