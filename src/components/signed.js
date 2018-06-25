import React, { Component } from 'react'
import TopBar               from './topBar';
import Main                 from './main';

class Signed extends Component {
    constructor(props) {
        super(props);
        this.onSelectView  = this.onSelectView  .bind(this);
        this.onGetStarted  = this.onGetStarted  .bind(this);
        this.state         = { view : 'Home' };
    }
    render() {
        const { onSelectView, onGetStarted } = this;
        const { view } = this.state;
        return (
                <div style = {{ maxWidth : '1400px', maxHeight : '100%' }}>
                    <TopBar onClick = {onSelectView} />
                    <Main view = {view} onGetStarted = {onGetStarted} />
                </div>
        );
    }
    onSelectView(view){ this.setState({view : view}); }
    onGetStarted(){ this.setState({ view : 'Performance Review' }); }
};
    
export default Signed;