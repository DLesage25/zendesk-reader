import React, { Component } from 'react';

export default class HelpHint extends Component {
    constructor(props){
        super(props);

        this.state = {};
    }

	render() {
		return (
      <div style={{width: this.props.width !== undefined ? this.props.width + 'px' : null, height: this.props.height !== undefined ? this.props.height + 'px' : null}}>
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