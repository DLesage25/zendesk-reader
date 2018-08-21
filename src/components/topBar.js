import React, { Component } from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import ViewLink from './viewLink.js';

const primaryOpts = [
    { text: 'Live stats', icon: 'fa fa-signal', active: true},
    { text: 'Forecasting', icon: 'fa fa-superscript', active: false}
];

const secondaryOpts = [
    { text: 'Settings', icon: 'fa fa-cogs', active: true},
    { text: 'Help', icon: 'fa fa-question', active: false},
];

export default class TopBar extends Component {
    constructor(props) {
        super(props);
        this.state       = { 
        						userType: 'univeral',
        						scrolled: false
        					 };
        this.onClick     = this.onClick.bind(this);
        this.renderLinks = this.renderLinks.bind(this);
        this.getScrollClasses = this.getScrollClasses.bind(this);
    }

    componentDidUpdate() {
    	if (this.state.scrolled !== this.props.scrolled) this.setState({scrolled: this.props.scrolled})
    }

    getScrollClasses (component) {
        switch(component) {
            case 'top-menu':
                if (!this.state.scrolled) {
                    return 'top-menu'
                } else {
                    return 'scrolled-top-menu top-menu'   
                }
                break;
            case 'float':
                if (!this.state.scrolled) {
                    return 'top-float'
                } else {
                    return 'scrolled-top-float top-float'   
                }
                break;
            case 'viewLink':
                if (!this.state.scrolled) {
                    return 'hidden-lg-down noselect top-link'
                } else {
                    return 'hidden-lg-down noselect scrolled-top-link top-link'   
                }
                break;
        }
    } 

	render() {
		return (
				 <nav className={this.getScrollClasses('top-menu')} style={{ zIndex: '110', position: 'fixed', top: '0px', left: '0px', right: '0px', boxShadow: '0 1px 0 rgba(12,13,14,0.1), 0 1px 6px rgba(59,64,69,0.1)' }}>
				    <div className="menu-icon-container hidden-md-up">
				        <div className="animate-menu-button left-menu-toggle">
				            <div />
				        </div>
				        </div>
				        <div className="menu" style={{ height: '50px', padding: '21px 16px' }}>
				            <div className="menu-info-block">
				                <div className="header-buttons" style={{boxSizing: 'inherit'}}>
				                    <div style={{float: 'left', width:'50%' }} className={this.getScrollClasses('float')} >
			                            {this.renderLinks(primaryOpts,'left')}
				                    </div>
				                    <div style={{float: 'right', width:'23%' }} className={this.getScrollClasses('float')} >
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
            const { text, icon, active } = item;
	        const uniqueID = 'view-link-' + i;
            
            var linkClass = '';

            if (!active) linkClass = 'disabled-top-link'; 
	        return(
	            <ViewLink
	                name            = {uniqueID}
	                spanClassname   = {this.getScrollClasses('viewLink')}
	                id              = {uniqueID}
	                key             = {uniqueID}
	                text            = {text}
	                icon            = {icon}
	                onClick         = {this.onClick}
                    linkClass       = {linkClass}
	            />
	        );
	    });
	}
}

