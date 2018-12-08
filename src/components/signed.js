import React, { Component } from 'react'
import Main                 from './main';

class Signed extends Component {
    constructor(props) {
        super(props);

        this.state = { 
                        view : 'generalSettings',
                        scrolled: false
                     };
    }

    render() {
        const { view } = this.state;
        return <Main view = {view} StartupData = {this.props.StartupData}  />
    }

};
    
export default Signed;