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
							<nav className="navbar navbar-expand-lg navbar-light bg-light">
					          <Dropdown style={{}} current={"Khan Academy"} options={["Grindr", "Khan Academy"]} action={() => {console.log('clicked')}} buttonClassName="main-card-dropdown btn btn-sm btn-outline-primary ml-2 dropdown-toggle" />
							  <div style={{marginLeft:'10px'}} className="collapse navbar-collapse" id="navbarNavAltMarkup">
							    <div className="navbar-nav">
							      <a className="nav-item nav-link settings-link" href="#">Home <span className="sr-only">(current)</span></a>
							      <a className="nav-item nav-link settings-link" href="#">Features</a>
							      <a className="nav-item nav-link settings-link" href="#">Pricing</a>
							      <a className="nav-item nav-link settings-link" href="#">Disabled</a>
							    </div>
							  </div>
							</nav>
				        </span>
				    </div>
				    <div className="card-body">
				    	{this.props.children}
				    </div>
				</section>
		)
	}

}
