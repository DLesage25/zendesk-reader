import React, { Component } from 'react';
import moment from 'moment';

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
            text: 'text' in this.props ? this.props.text : '<default text>',
            current: 'Khan Academy',
            lastFetch: moment().format('MM/DD @ hh:mma'),
        };

        this.updateData = this.updateData.bind(this);
        this.updateLastFetch = this.updateLastFetch.bind(this);

    }

    updateData (programName) {
    	this.setState({ 
	      current: programName
	    }, this.props.action(programName));  
    }

    updateLastFetch (timestamp) {
    	this.setState({ 
	      lastFetch: timestamp
	    }); 
    }

	render() {

		const childWithProp = React.Children.map(this.props.children, (child) => {
		    return React.cloneElement(child, {updateLastFetch: (timestamp) => this.updateLastFetch(timestamp)});
		});

		const { globalProgram, programList } = this.props;

		return (
				<section className="card">
				    <div className="card-header">
				        <span className="cat__core__title card-title" style={{ fontSize: '18px' }}>
							<nav className="navbar navbar-expand-lg navbar-light bg-light">
					          <Dropdown style={{}} current={globalProgram.settings.prettyName} options={programList.map((o) => { return o.prettyName })} action={(programName) => this.updateData(programName)} buttonClassName="main-card-dropdown btn btn-sm btn-outline-primary ml-2 dropdown-toggle" />
							  <div style={{marginLeft:'10px'}} className="collapse navbar-collapse" id="navbarNavAltMarkup">
							    <div className="navbar-nav">
							      <a className="nav-item nav-link settings-link" href="#">Home <span className="sr-only">(current)</span></a>
							      <a className="nav-item nav-link settings-link" href="#">Features</a>
							      <a className="nav-item nav-link settings-link" href="#">Pricing</a>
							      <a className="nav-item nav-link settings-link" href="#">Disabled</a>
							    </div>
							  </div>
							</nav>
						    <div style={{ float: 'right', marginRight: '10px'}}>
				            	<span style={{fontSize:'13px', color:'gray'}}> <b>Last updated</b> { this.state.lastFetch } </span>
				            </div>
				        </span>
				    </div>
				    <div className="card-body">
				    	{childWithProp}
				    </div>
				</section>
		)
	}

}
