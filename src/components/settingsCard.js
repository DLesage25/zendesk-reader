import React, { Component } from 'react';

import CardComponent from './cardComponent'
import Dropdown from './dropdown'

export default class SettingsCard extends Component {
    constructor(props){
        super(props);

        this.state = {
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
				        <span className="cat__core__title card-title" style={{ fontSize: '18px' }}>
				            <Dropdown current={"test"} options={["programList"]} action={(option) => { console.log(option)}} buttonClassName="btn btn-sm btn-primary ml-2 dropdown-toggle" />
				        </span>
				    </div>
				    <div className="card-body">
				    	{this.props.children}
				    </div>
				</section>
		)
	}

}
