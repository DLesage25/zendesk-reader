import React, { Component } from 'react';

export default class CardComponent extends Component {

    constructor(props){
        super(props);

        var bodyWidth = 'col-lg-6';
        //this.onClick        = this.onClick.bind(this);
        this.state = {
            //value          : 'selected' in this.props ? this.props.selected : false,
            open           : false,
            focused_btn    : false,
            focused_choice : false,
            columnClassname: 'columnClassname' in this.props ? this.props.columnClassname : 'col-lg-6',
            title : 'title' in this.props ? this.props.title : 'card title',
            description: 'description' in this.props ? this.props.description : '<default description>',
            body: 'body' in this.props ? this.props.body : 'card body',
            bodyWidth: bodyWidth,
            marginBottom: 'marginBottom' in this.props ? this.props.marginBottom: '0px',
            divHeight: 'divHeight' in this.props ? this.props.divHeight: '233px',
            marginLeft: 'marginLeft' in this.props ? this.props.marginLeft: '0px',
            maxWidth: 'maxWidth' in this.props ? this.props.maxWidth: '',
            id: 'id' in this.props ? this.props.id : null
        };

    }

	render() {

		return (
	            <div className={ this.state.columnClassname } style={{ maxWidth: this.state.maxWidth, marginBottom: this.state.marginBottom, marginLeft: this.state.marginLeft }} id={this.state.id}>
	                <h5 className="text-black card-title"><strong> { this.state.title } </strong></h5>
	                <p className="text-muted"> { this.state.description } </p>
	                <div className="mb-5">
	                    <div height="466" id="chart-line" style={{display: 'block', height: this.state.divHeight , width: this.state.bodyWidth }}>
	                    	{ this.props.children }
	                    </div>
	                </div>
	            </div>
				)
	}
}