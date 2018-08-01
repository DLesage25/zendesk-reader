import React, { Component } from 'react';
import Generalpage          from './generalPage';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state        = { 
                hasError: false
            };
        this.onGetStarted = this.onGetStarted.bind(this);
    }
    componentDidCatch(){ this.setState({ hasError : true }); }

    render() {
        const { hasError } = this.state;
        return (
            <section className = 'page-content' >
                <div className = 'page-content-inner'>
                    <nav className = 'top-submenu top-submenu-with-background'>
                        <div className = 'row' style = {{ height:'100%'}} >
                            {this.renderSections(this.props.StartupData)}
                        </div >
                    </nav >
                </div>
            </section >
        );
    }
    renderSections(StartupData) {
        switch (this.props.view) {
            case 'generalPage'             : return <Generalpage StartupData={StartupData} />;
            default:                     return <div><Generalpage onGetStarted = { this.onGetStarted } /></div>;
        };
    }
    // renderSections() {
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
    //     switch (view) {
    //         case 'Welcome'             : return <Welcome />;
    //         case 'Performance Review'  : return <PerformanceReview />;
    //         default:                     return <Welcome onGetStarted = { this.onGetStarted } />;
    //     };
    // }
    onGetStarted(){
        if ('onGetStarted' in this.props) this.props.onGetStarted();
        else console.warn('onGetStarted event handler for main has not been defined by parent component');
    }
};


export default Main;