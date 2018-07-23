import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { changeGlobalDate } from '../actions';

class Dropdown extends Component {
    constructor(props){
        super(props);

        this.state = {
            current           : 'current' in this.props ? this.props.current: 'Current',
            options           : 'options' in this.props ? this.props.options : ['<default text>']
        };
        this.renderOptions = this.renderOptions.bind(this);
    }

    renderOptions(options) {
    	return options.map((option) => {
    		return <a key={option} onClick={e => this.props.changeGlobalDate(option)} className="dropdown-item" href="#" style={{ fontSize: '15px' }}> {option.replace(/_/g, '/')} </a>
    	})
    }

	render() {
		return (
			<div className="dropdown">
			  <button type="button" className="btn btn-sm btn-secondary ml-2 dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    {this.state.current.replace(/_/g, '/')}
			  </button>
			  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
			  	{this.renderOptions(this.state.options)}
			  </div>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        changeGlobalDate : changeGlobalDate
    }, dispatch);
}

function mapStateToProps(state){
	console.log('new staet', {state})
    return { 
        ...state
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
//need to connect this to change global state based on this