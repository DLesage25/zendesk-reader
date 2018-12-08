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
		const { onMouseEnter, onMouseLeave, style } = this;
        const { orientation, id, text, onClick, linkClass } = this.props;

		return (
			    <div className="dropdown" style={{
						                    marginLeft  : orientation ? '0px' : '25px',
						                    marginRight : orientation ? '25px' : '0px',
			    							cursor: 'pointer'
			    						}}>
			        <div name="strip-container" style={{position: 'absolute', margin: 0, padding: 0, width: 0, height: 0, zIndex: 100}}>
			            <span name="strip" style={{margin: 0, padding: 0, width: 0, height: 0}} />
			        </div>
			        <a className="button" className={linkClass} onClick={() => {onClick(text)}} href="#">
			        	<i className= { this.state.icon } style={{marginLeft: 10, marginTop: 10}} />
			            <span className={ this.state.spanClassname } style={{marginLeft: 10 }}> { text } </span>
			        </a>
			    </div>
				)
		

	}
}