import React, { Component } from 'react';
import Generalpage          from './generalPage';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state        = { hasError: false };
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
                            {this.renderSections(this.props.data)}
                        </div >
                    </nav >
                </div>
            </section >
        );
    }
    renderSections(data) {
        switch (this.props.view) {
            case 'generalPage'             : return <Generalpage data={data} />;
            default:                     return <div><Generalpage onGetStarted = { this.onGetStarted } /></div>;
        };
    }
    onGetStarted(){
        if ('onGetStarted' in this.props) this.props.onGetStarted();
        else console.warn('onGetStarted event handler for main has not been defined by parent component');
    }
};


export default Main;