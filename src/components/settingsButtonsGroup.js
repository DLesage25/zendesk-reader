import React, { Component } from 'react';
import HelpHint from './helpHint';

export default class SettingsButtonsGroup extends Component {
    constructor(props){
        super(props);
        this.state = {
        };
        this.renderButtons        = this.renderButtons.bind(this);
        this.onClick              = this.onClick.bind(this);
        this.upperCaseFirstLetter = this.upperCaseFirstLetter.bind(this);
    }

    onClick(value) {
        if ('onClick' in this.props) this.props.onClick(value, this.props.title);
        else console.warn('onClick event handler for controller has not been defined by parent component');
    }

    upperCaseFirstLetter (value) {

      let convert = ((typeof(value) === "boolean") ? value.toString() : value)
      let result = convert.charAt(0).toUpperCase() + convert.substr(1);
      return result;
    }

    renderButtons (options){

      return options.map((item, i) => {
          const { value, className, id } = item;
          const uniqueID = id || 'settings-button-' + i;
          return(
              <button
                  name        = {uniqueID}
                  className   = {className}
                  id          = {uniqueID}
                  key         = {uniqueID}
                  type        = "button"
                  value       = {value}
                  onClick     = {() => this.onClick(value)}
              >{this.upperCaseFirstLetter(value)}</button>
          );
      });
    }

    componentDidMount() {
      this.setState({ 
        value: this.props.value
      }); 
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ 
        value: nextProps.value
      });  
    }

  render() {

    return (
          <div style={{marginBottom: '1rem'}}> 
              <HelpHint hint={this.props.hint} width="150">
                <label htmlFor="basic-url">{this.props.title}</label>
              </HelpHint>
              <br />
              <div className="btn-group" role="group" aria-label="Basic example">
                {this.renderButtons(this.props.options)}
              </div>
          </div>
    )
  }
}