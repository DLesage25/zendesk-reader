import React, { Component } from 'react';
import moment from 'moment';

import CardComponent from './cardComponent'
import Dropdown from './dropdown'
import BrandDropdown from './brandDropdown'
import DatePicker from 'react-datepicker'


export default class ProductivityCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            title          : 'title' in this.props ? this.props.title: 'Card title',
            focused_btn    : false,
            focused_choice : false,
            icon 		   : 'icon' in this.props ? this.props.icon : 'fa fa-check-square-o',
            text 		   : 'text' in this.props ? this.props.text : '<default text>',
            globalDate     : (this.props.globalDate === moment().format('MM/DD/YY')) ? moment() : moment(this.props.globalDate.replace(/_/g,'/'), "MM-DD-YYYY"),
            displayLoader  : this.props.displayLoader

        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
		this.setState({
			globalDate   : (nextProps.globalDate === moment().format('MM/DD/YY')) ? moment() : moment(nextProps.globalDate.replace(/_/g,'/'), "MM-DD-YYYY"),
			displayLoader: nextProps.displayLoader
		}) 
    }

    handleChange(date) {
	    this.setState({
	      globalDate: date
	    }, () => {this.props.changeGlobalDate(date.format('MM_DD_YY'))});
  	}

	render() {
		const {
			globalProgram,
			changeGlobalDate,
			changeGlobalProgram,
			dateList, 
			programList,
			refreshData,
			lastFetch
		} = this.props;

		const loader = (
			<div style={{ float: 'right', marginRight: '10px', marginTop: '8.5px'}}>
				<div className="lastUpdatedLoader"></div>
            </div>
		);

		return (
				<section className="card">
				    <div className="card-header">
				        <span className="cat__core__title card-title" style={{ fontSize: '18px' }}>
				        	<div style={{ float: 'left'}}>
					            <Dropdown current={globalProgram.settings.prettyName} options={programList.map((o) => { return o.prettyName })} action={changeGlobalProgram} buttonClassName="main-card-dropdown btn btn-sm btn-outline-primary ml-2 dropdown-toggle" />
					            <DatePicker
							        selected={this.state.globalDate}
							        onChange={this.handleChange}
							    />
							</div>
				            <div style={{ float: 'right', marginRight: '10px'}}>
				            	<span style={{fontSize:'13px', color:'gray'}}> <b>Last updated</b> { (lastFetch) ? moment(lastFetch, 'X').format('MM/DD @ hh:mma') : moment().format('MM/DD @ hh:mma') } </span>
							<button type="button" className="main-card-dropdown btn btn-sm ml-2 btn-outline-primary" onClick={() => this.props.refreshData()} > <i className="fa fa-sync-alt" /> </button>
				            </div>
				            {this.state.displayLoader ? loader : null}
				        </span>
				    </div>
				    <div className="card-body">
				    	{this.props.children}
				    </div>
				</section>
		)
	}

}
