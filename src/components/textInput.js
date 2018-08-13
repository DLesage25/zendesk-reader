import React, { Component } from 'react';

export default class TextInput extends Component {
    constructor(props){
        super(props);

        const prepend = (<div className="input-group-prepend">
                      <span className="input-group-text" id="basic-addon3">{this.props.prepend}</span>
                    </div>);

        const append = (<div className="input-group-append">
                          <span className="input-group-text" id="basic-addon2">{this.props.append}</span>
                        </div>);

        this.state = {
            append,
            prepend
        };
    }


	render() {

		return (
          <div>
  			    <label htmlFor="basic-url">{this.props.title}</label>
            <div className="input-group mb-3">
              {this.props.prepend ? this.state.prepend : null}
              <input type="text" className="form-control" placeholder={this.props.placeholder} aria-label={this.ariaLabel} aria-describedby={this.props} />
              {this.props.append ? this.state.append : null}
            </div>
          </div>
		)
	}

}