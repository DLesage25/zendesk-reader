import React, { Component } from 'react';
import FB from '../modules/firebaseDAO';


export default class SettingsButtonsGroup extends Component {
    constructor(props){
        super(props);

        this.state = {
            goal: 'touches',
            olark: false
        };

    }

    componentDidMount() {
      this.setState({ 
        goal: this.props.goal,
        olark: this.props.olark
      }, () => {console.log("setting button mounted: " + JSON.stringify(this.state))}); 
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ 
        goal: nextProps.goal,
        olark: nextProps.olark
      }, () => {console.log(this.state)});  
    }

  render() {
    console.log("Rendered")
    
    const goalType = (
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className={((this.state.goal === 'touches') ? 'btn btn-secondary active' : 'btn btn-secondary')}>Touches</button>
        <button type="button" className={((this.state.goal === 'solved') ? 'btn btn-secondary active' : 'btn btn-secondary')}>Solved</button>
        <button type="button" className={((this.state.goal === 'chats') ? 'btn btn-secondary active' : 'btn btn-secondary')}>Chats</button>
      </div>
    );

    const olarkChats = (
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className={((this.state.olark) ? 'btn btn-secondary active' : 'btn btn-secondary')}>True</button>
        <button type="button" className={((this.state.olark) ? 'btn btn-secondary' : 'btn btn-secondary active')}>False</button>
      </div>
    );

    var children = {
      "Goal Type": goalType,
      "Olark Chats": olarkChats
    };

    return (
          <div style={{marginBottom: '1rem'}}> 
              <label htmlFor="basic-url">{this.props.title}</label>
              <br />
              {children[this.props.title]}
          </div>
    )
  }
}