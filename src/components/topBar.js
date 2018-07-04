import React, { Component } from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import ViewLink from './viewLink.js';

const primaryOpts = [
    { text: 'Team stats', icon: 'fa fa-signal'},
    { text: 'User stats', icon: 'fa fa-user'},
    { text: 'Forecasting', icon: 'fa fa-superscript'}
];

const secondaryOpts = [
    { text: 'Settings', icon: 'fa fa-cogs'},
    { text: 'Help', icon: 'fa fa-question'},
];

export default class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state       = { userType: 'univeral' };
        this.onClick     = this.onClick.bind(this);
        this.renderLinks = this.renderLinks.bind(this);
    }
	render() {
		return (
				 <nav className="top-menu" style={{ height: '80px', background: '#ffffff', borderBottom: '1px solid #dfe4ed', zIndex: '110', position: 'fixed', top: '0px', left: '0px', right: '0px', backgroundColor: 'rgba(0,0,0,.03)' }}>
				    <div className="menu-icon-container hidden-md-up">
				        <div className="animate-menu-button left-menu-toggle">
				            <div />
				        </div>
				        </div>
				        <div className="menu" style={{ height: '80px', padding: '21px 16px'}}>
				            <div className="menu-info-block">
				                <div className="header-buttons" style={{boxSizing: 'inherit'}}>
				                    <div style={{float: 'left', width:'50%'}}>
			                            {this.renderLinks(primaryOpts,'left')}
				                    </div>
				                    <div style={{float: 'right', width:'23%'}}>
			                            {this.renderLinks(secondaryOpts,'right')}
				                    </div>
				                </div>
				            </div>
				        </div>
				</nav>
		)
	}
    onClick(ButtonText) {
        if ('onClick' in this.props) this.props.onClick(ButtonText);
        else console.warn('onClick event handler for controller has not been defined by parent component');
    }
    renderLinks(options,orientation){
	    const { UserData } = this.props;

	    return options.map((item, i) => {
            const { text, icon, id } = item;
	        const uniqueID = id || 'view-link-' + i;
	        return(
	            <ViewLink
	                name        = {uniqueID}
	                id          = {uniqueID}
	                key         = {uniqueID}
	                text        = {text}
	                icon        = {icon}
	                onClick     = {this.onClick}
	            />
	        );
	    });
	}
}

