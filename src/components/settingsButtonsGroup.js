import React, { Component } from 'react';

export default class SettingsButtonsGroup extends Component {
    constructor(props){
        super(props);
        const goalType = (
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-secondary active">Touches</button>
            <button type="button" className="btn btn-secondary">Solved</button>
            <button type="button" className="btn btn-secondary">Chats</button>
          </div>
        );

        const olarkChats = (
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="button" className="btn btn-secondary">True</button>
            <button type="button" className="btn btn-secondary active">False</button>
          </div>
        );
        this.state = {
            children:{
              "Goal Type": goalType,
              "Olark Chats": olarkChats
            }
        };
    }

  render() {

    return (
          <div style={{marginBottom: '1rem'}}> 
              <label htmlFor="basic-url">{this.props.title}</label>
              <br />
              {this.state.children[this.props.title]}
          </div>
    )
  }
}