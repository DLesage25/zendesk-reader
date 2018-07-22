import React, { Component } from 'react';

export default class Dropdown extends Component {
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
    		return <a key={option} className="dropdown-item" href="#"> {option} </a>
    	})
    }

	render() {
		return (
			<div className="dropdown">
			  <button type="button" className="btn btn-sm btn-secondary ml-2 dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			    {this.state.current}
			  </button>
			  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
			  	{this.renderOptions(this.state.options)}
			  </div>
			</div>
		)
	}
}