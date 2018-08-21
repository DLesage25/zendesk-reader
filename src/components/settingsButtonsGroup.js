import React, { Component } from 'react';
import FB from '../modules/firebaseDAO';


export default class SettingsButtonsGroup extends Component {
    constructor(props){
        super(props);

        this.state = {
            goal: null,
            olark: null
        };

        this.onClick = this.onClick.bind(this);
        this.timerHandler = this.timerHandler.bind(this);
        this.doneClicking = this.doneClicking.bind(this);

        //variables
        this.typingTimer;                //timer identifier
        this.doneClickingInterval = 5000;  //5s


    }

    onClick (field, value) {
      this.setState({ field: value }, () => {console.log("onClick update: " + JSON.stringify(this.state))});
    }

    //click timer handler-----------------------------------------------

    timerHandler (event) {
      console.log("timerhandler fired")
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(this.doneClicking, this.doneClickingInterval);
    }

    doneClicking () {
      let value = {
        "Olark Chats": this.state.olark,
        "Goal Type": this.state.goal
      }
      this.props.updateFBData({value: value[this.props.title], field: this.props.title});
    }
    //----------------------------------------------------------

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
    console.log("Rendered" + JSON.stringify(this.state))
    
    const goalType = (
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className={((this.state.goal === 'touches') ? 'btn btn-secondary active' : 'btn btn-secondary')} onClick={() => this.setState({ goal: 'touches' }, () => this.timerHandler())}>Touches</button>
        <button type="button" className={((this.state.goal === 'solved') ? 'btn btn-secondary active' : 'btn btn-secondary')} onClick={() => this.setState({ goal: 'solved' }, () => this.timerHandler())}>Solved</button>
        <button type="button" className={((this.state.goal === 'chats') ? 'btn btn-secondary active' : 'btn btn-secondary')} onClick={() => this.setState({ goal: 'chats' }, () => this.timerHandler())}>Chats</button>
      </div>
    );

    const olarkChats = (
      <div className="btn-group" role="group" aria-label="Basic example">
        <button type="button" className={((this.state.olark) ? 'btn btn-secondary active' : 'btn btn-secondary')} onClick={() => this.setState({ olark: true }, () => this.timerHandler())}>True</button>
        <button type="button" className={((this.state.olark) ? 'btn btn-secondary' : 'btn btn-secondary active')} onClick={() => this.setState({ olark: false }, () => this.timerHandler())}>False</button>
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