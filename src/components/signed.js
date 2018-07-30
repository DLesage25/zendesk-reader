import React, { Component } from 'react'
import TopBar               from './topBar';
import Main                 from './main';
import ScrollDetector from './ScrollDetector';


class Signed extends Component {
    constructor(props) {
        super(props);
        this.onSelectView  = this.onSelectView  .bind(this);
        this.onGetStarted  = this.onGetStarted  .bind(this);
        this.updateScroll  = this.updateScroll.bind(this);

        this.state = { 
                        view : 'generalPage',
                        scrolled: false
                     };
    }

    updateScroll(scroll) {
        this.setState({ scroll })
        if (!scroll || scroll < 50) {
            this.setState({scrolled: false})  
        } else {
            this.setState({scrolled: true})  
        }
    }

    render() {
        const { onSelectView, onGetStarted } = this;
        const { view } = this.state;
        return (
                <div style = {{ maxWidth : '1400px', maxHeight : '100%' }}>
                    <TopBar onClick = {onSelectView} scrolled = {this.state.scrolled} />
                    <Main view = {view} StartupData = {this.props.StartupData}  />
                    <ScrollDetector updateScroll = {this.updateScroll} />
                </div>
        );
    }
    onSelectView(view){ this.setState({ view : view }) }
    onGetStarted(){ this.setState({ view : 'generalPage' }) }
};
    
export default Signed;