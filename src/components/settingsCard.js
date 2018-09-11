import React, { Component } from 'react';
import moment from 'moment';

import CardComponent from './cardComponent'
import Dropdown from './dropdown'

export default class SettingsCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            title          : 'title' in this.props ? this.props.title: 'Card title',
            focused_btn    : false,
            focused_choice : false,
            icon 	   	   : 'icon' in this.props ? this.props.icon : 'fa fa-check-square-o',
            text		   : 'text' in this.props ? this.props.text  : '<default text>',
            current        : this.props.globalProgram.settings.prettyName,
            lastFetch	   : this.props.lastFetch,
            displayLoader  : this.props.displayLoader
        };

    }

    componentWillReceiveProps(nextProps) {
		this.setState({
			current: nextProps.globalProgram.settings.prettyName,
			lastFetch: nextProps.lastFetch,
			displayLoader: nextProps.displayLoader
		}) 
    }

	render() {
		const { globalProgram, programList, changeGlobalProgram } = this.props;

		const loader = (
			<div style={{ float: 'right', marginRight: '10px', marginTop: '8.5px'}}>
				<div className="lastUpdatedLoader"></div>
            </div>
		);

		return (

				<section className="card">
				    <div className="card-header">
				        <span className="cat__core__title card-title" style={{ fontSize: '18px' }}>
							<nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ display: 'table-row' }}>
					          <Dropdown current={globalProgram.settings.prettyName} options={programList.map((o) => { return o.prettyName })} action={changeGlobalProgram} buttonClassName="main-card-dropdown btn btn-sm btn-outline-primary ml-2 dropdown-toggle" />
							  <div style={{marginLeft:'10px'}} className="collapse navbar-collapse" id="navbarNavAltMarkup">
							  </div>
							</nav>
						    <div style={{ float: 'right', marginRight: '10px'}}>
				            	<span style={{fontSize:'13px', color:'gray'}}> <b> Last updated</b> { this.state.lastFetch } </span>
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
