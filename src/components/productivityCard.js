import React, { Component } from 'react';
import moment from 'moment';

import CardComponent from './cardComponent'
import Dropdown from './dropdown'
import BrandDropdown from './brandDropdown'

export default class ProductivityCard extends Component {
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
		const {
			globalDate,
			globalProgram,
			changeGlobalDate,
			changeGlobalProgram,
			dateList, 
			programList,
			refreshData,
			lastFetch
		} = this.props;
		return (
				<section className="card">
				    <div className="card-header">
				        <span className="cat__core__title card-title" style={{ fontSize: '18px' }}>
				        	<div style={{ float: 'left'}}>
					            <Dropdown current={globalProgram.settings.prettyName} options={programList} action={changeGlobalProgram} buttonClassName="btn btn-sm btn-outline-primary ml-2 dropdown-toggle" />
					            <Dropdown current={(globalDate === moment().format('MM/DD/YY')) ? 'Today' : globalDate} options={dateList} action={changeGlobalDate} buttonClassName="btn btn-sm btn-outline-secondary ml-2 dropdown-toggle"/>
				            </div>
				            <div style={{ float: 'right', marginRight: '10px'}}>
				            	<span style={{fontSize:'13px', color:'gray'}}> <b>Last updated</b> { (lastFetch) ? moment(lastFetch, 'X').format('MM/DD @ hh:mma') : moment().format('MM/DD @ hh:00a') } </span>
							<button type="button" className="btn btn-sm ml-2 btn-outline-primary" onClick={() => this.props.refreshData()} > <i className="fa fa-sync-alt" /> </button>
				            </div>
				        </span>
				    </div>
				    <div className="card-body">
				    	{this.props.children}
				    </div>
				</section>
		)
	}

}
