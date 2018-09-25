import React, { Component } from 'react';

import Generalpage          from './generalPage';

import TopBar               from './topBar';
import ScrollDetector from './ScrollDetector';
import SettingsPage         from './settingsPage';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state        = { 
                view : 'Live stats',
                scrolled: false
            };
        this.onGetStarted = this.onGetStarted.bind(this);
        this.updateScroll  = this.updateScroll.bind(this);
        this.onSelectView  = this.onSelectView  .bind(this);
    }

    componentDidCatch(){ this.setState({ hasError : true }); }
    onSelectView(view){ if(view !== this.state.view) this.setState({ view:view }) }
    onGetStarted(){ this.setState({ ...this.state, view : 'Live stats' }) }

    updateScroll(scroll) {
        if (!scroll || scroll < 50) {
            if(this.state.scrolled === true) this.setState({scrolled: false})  
        } else {
            if(this.state.scrolled === false) this.setState({scrolled: true})  
        }
    }

    render() {
        const { onSelectView, onGetStarted, updateScroll } = this;
        const { hasError, scrolled, view } = this.state;
        return (
                <div style = {{ maxWidth : '1400px', maxHeight : '100%' }}>
                    <TopBar onClick = {onSelectView} scrolled = {scrolled} />
                    <section className = 'page-content' >
                        <div className = 'page-content-inner'>
                            <nav className = 'top-submenu top-submenu-with-background'>
                                <div className = 'row' style = {{ height:'100%', display: 'block !important'}} >
                                    {this.renderSections(this.props.StartupData)}
                                </div >
                            </nav >
                        </div>
                    </section>
                    <ScrollDetector updateScroll = {updateScroll} />
                </div>
        );
    }

    changeView() {

    }

    renderSections(StartupData) {
        switch (this.state.view) {
            case 'Live stats'             : return <Generalpage appData={StartupData} />;
            case 'Settings'            : return <SettingsPage appData={StartupData} />;
            default:                     return <div><Generalpage appData={StartupData} onGetStarted = { this.onGetStarted } /></div>;
        };
    }

    onGetStarted(){
        if ('onGetStarted' in this.props) this.props.onGetStarted();
        else console.warn('onGetStarted event handler for main has not been defined by parent component');
    }
};


export default Main;