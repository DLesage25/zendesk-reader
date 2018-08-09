import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

export default class BrandDropdown extends Component {
    constructor(props){
        super(props);
        this.renderOptions = this.renderOptions.bind(this);
    }

    renderOptions(options) {
    	return options.map((option, index) => {
    		return <a key={option + index} onClick={() => this.props.action(option)} className="dropdown-item" href="#" style={{ fontSize: '15px' }}> {option.replace(/_/g, '/')} </a>
    	})
    }

	render() {
		return (
			<div className="dropdown">
				<a className="navbar-brand dropdown-toggle" id="dropdownMenuButton" href="#" style={{color:"gray"}} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    	{this.props.current.replace(/_/g, '/')}
				</a>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					{this.renderOptions(this.props.options)}
				</div>
			</div>
		)
	}
}