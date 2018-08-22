import React, { Component } from 'react';

import Generalpage          from './generalPage';

import TopBar               from './topBar';
import ScrollDetector from './ScrollDetector';
import SettingsPage         from './settingsPage';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state        = { 
                view : 'Live stats'
            };
        this.onGetStarted = this.onGetStarted.bind(this);
        this.updateScroll  = this.updateScroll.bind(this);
        this.onSelectView  = this.onSelectView  .bind(this);
    }

    componentDidCatch(){ this.setState({ hasError : true }); }
    onSelectView(view){ console.log(view); if(view !== this.state.view) this.setState({ view:view }) }
    onGetStarted(){ this.setState({ view : 'Live stats' }) }

    updateScroll(scroll) {
        if (!scroll || scroll < 50) {
            this.setState({scrolled: false})  
        } else {
            this.setState({scrolled: true})  
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
                                <div className = 'row' style = {{ height:'100%'}} >
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
    // // renderSections() {

    //     let {view} = this.props; 
    //     let showCareerCalibrationOf = '';       
    //     if(typeof view === 'object'){
    //         let {ButtonText, userID} = view;
    //         switch(ButtonText){
    //             case 'Career Calibration':
    //             case 'Performance Review':  
    //                 view = ButtonText;
    //                 showCareerCalibrationOf = userID;
    //                 break; 
    //         }
    //     }
        switch (this.state.view) {
            case 'Live stats'             : return <Generalpage appData={StartupData} />;
            case 'Settings'            : return <SettingsPage />;
            default:                     return <div><Generalpage appData={StartupData} onGetStarted = { this.onGetStarted } /></div>;
        };
    }

    onGetStarted(){
        if ('onGetStarted' in this.props) this.props.onGetStarted();
        else console.warn('onGetStarted event handler for main has not been defined by parent component');
    }
};


export default Main;