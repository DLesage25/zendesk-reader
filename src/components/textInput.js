import React, { Component } from 'react';
const moment = require('moment');

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
            prepend,
            value: '',
            lastModified: ''
        };
        //functions
        this.onChange = this.onChange.bind(this);
        this.timerHandler = this.timerHandler.bind(this);
        this.doneTyping = this.doneTyping.bind(this);

        //variables
        this.typingTimer;                //timer identifier
        this.doneTypingInterval = 5000;  //5s


    }

    onChange (event) {
      console.log("fired " + event.target.value)
      this.setState({ value: event.target.value }, (event) => this.timerHandler(event)); 
    }

    //typing timer handler-----------------------------------------------

    timerHandler (event) {
      console.log("timerhandler fired")
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(this.doneTyping, this.doneTypingInterval);
    }

    doneTyping () {
      this.props.updateFBData({value: this.state.value, field: this.props.title});
    }
    //----------------------------------------------------------


    componentDidMount() {
      this.setState({ value: this.props.value }); 
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ value: nextProps.value });
    }


	render() {

		return (
          <div>
  			    <label htmlFor="basic-url">{this.props.title}</label>
            <div className="input-group mb-3">
              {this.props.prepend ? this.state.prepend : null}
              <input type="text" className="form-control" aria-label={this.ariaLabel} aria-describedby={this.props} value={this.state.value} onChange={(event) => this.onChange(event)}/>
              {this.props.append ? this.state.append : null}
            </div>
          </div>
		)
	}

}