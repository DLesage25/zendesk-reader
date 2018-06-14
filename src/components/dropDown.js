import React, { Component } from 'react';

export default class Dropdown extends Component {

    constructor(props){
        super(props);
        //this.onClick        = this.onClick.bind(this);
        this.state = {
            //value          : 'selected' in this.props ? this.props.selected : false,
            open           : false,
            focused_btn    : false,
            focused_choice : false,
            icon : 'icon' in this.props ? this.props.icon : 'fa fa-check-square-o',
            text: 'text' in this.props ? this.props.text : '<default text>'
        };
    }

	render() {
		return (
			    <div className="dropdown" style={{marginLeft: 0, marginRight: 25, cursor: 'pointer'}}>
			        <div name="strip-container" style={{position: 'absolute', margin: 0, padding: 0, width: 0, height: 0, zIndex: 100}}>
			            <span name="strip" style={{margin: 0, padding: 0, width: 0, height: 0}} />
			        </div>
			        <a className="button">
			        	<i className= { this.state.icon } style={{marginLeft: 10, marginTop: 10}} />
			            <span className="hidden-lg-down noselect" style={{marginLeft: 10, fontWeight: 600 }}> { this.state.text } </span>
			        </a>
			    </div>
				)
	}
}