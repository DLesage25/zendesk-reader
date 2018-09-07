import React, { Component } from 'react';

export default class HelpHint extends Component {
    constructor(props){
        super(props);

        this.state = {};
    }

	render() {
		return (
      <div style={{width: this.props.width ? this.props.width + 'px' : '0px', height: this.props.height ? this.props.height + 'px' : '0px'}}>
        {this.props.children}
        {this.props.hint ? 
          <div className="help-tip">
            <p>{this.props.hint}</p>
          </div>
        : null}
      </div>
		)
	}

}