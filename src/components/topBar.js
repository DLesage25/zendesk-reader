import React, { Component } from 'react';
import Dropdown from './dropDown.js';

export default class TopBar extends Component {
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
				                    	<Dropdown icon="fa fa-signal" text="General stats" />
				                    	<Dropdown icon="fa fa-user" text="Associate stats"/>
				                    	<Dropdown icon="fa fa-superscript" text="Forecasting"/>
				                    </div>
				                    <div style={{float: 'right', width:'23%'}}>
				                    	<Dropdown icon="fa fa-cogs" text="Settings"/>
				                    	<Dropdown icon="fa fa-question" text="Help"/>
				                    </div>
				                </div>
				            </div>
				        </div>
				</nav>
		)
	}
}
