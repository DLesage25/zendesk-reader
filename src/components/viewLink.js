import React, { Component } from 'react';

export default class Dropdown extends Component {

    constructor(props){
        super(props);
        //this.onClick      = this.onClick        .bind(this);
        //this.onMouseEnter = this.onMouseEnter   .bind(this);
        //this.onMouseLeave = this.onMouseLeave   .bind(this);
        this.state = {
            //value          : 'selected' in this.props ? this.props.selected : false,
            open           : false,
            focused_btn    : false,
            focused_choice : false,
            icon : 'icon' in this.props ? this.props.icon : 'fa fa-check-square-o',
            text : 'text' in this.props ? this.props.text : '<default text>',
            spanClassname : 'spanClassname' in this.props ? this.props.spanClassname : 'hidden-lg-down noselect'
        };
    }

	render() {
		const { onClick, onMouseEnter, onMouseLeave, style } = this;
        const { orientation, id, text } = this.props;
		return (
			    <div className="dropdown" style={{
						                    marginLeft  : orientation ? '0px' : '25px',
						                    marginRight : orientation ? '25px' : '0px',
			    							cursor: 'pointer'
			    						}}>
			        <div name="strip-container" style={{position: 'absolute', margin: 0, padding: 0, width: 0, height: 0, zIndex: 100}}>
			            <span name="strip" style={{margin: 0, padding: 0, width: 0, height: 0}} />
			        </div>
			        <a className="button">
			        	<i className= { this.state.icon } style={{marginLeft: 10, marginTop: 10}} />
			            <span className={ this.state.spanClassname } style={{marginLeft: 10, fontWeight: 600 }}> { this.props.text } </span>
			        </a>
			    </div>
				)
		

	}
}