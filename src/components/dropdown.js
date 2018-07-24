import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

export default class Dropdown extends Component {
    constructor(props){
        super(props);
        this.renderOptions = this.renderOptions.bind(this);
    }

    renderOptions(options) {
    	return options.map((option) => {
    		return <a key={option} onClick={e => this.props.action(option)} className="dropdown-item" href="#" style={{ fontSize: '15px' }}> {option.replace(/_/g, '/')} </a>
    	})
    }

	render() {
		return (
			<div className="dropdown">
			  <button type="button" className="btn btn-sm btn-secondary ml-2 dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    {this.props.current.replace(/_/g, '/')}
			  </button>
			  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
			  	{this.renderOptions(this.props.options)}
			  </div>
			</div>
		)
	}
}