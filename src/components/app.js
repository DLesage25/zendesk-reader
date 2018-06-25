import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import { 
    login,
    fetchAndInitialize
}                             from '../actions';
import Signed                 from './signed';
// import ThingyLoader           from './thingyloader';

import Generalpage from './generalPage';
import TopBar from './topBar';

class App extends Component {
    constructor(props){
        super(props);
        if(!this.props.EntryData) this.props.login();
    }

    render() {
        const { EntryData, Loaded } = this.props;
        if(!EntryData) return <div> No entry data.. </div>;
        return(
            <div>
                { 
                    !Loaded ?
                    <div style = {{ maxWidth:'1400px' }}>
                        <div 
                            style = {{ 
                                position:   'absolute',
                                top:        '50%',
                                left:       '50%',
                                transform:  'translate(-50%,-50%)'
                            }}
                        >
                        <p> Loading... </p>
                        </div>
                    </div>
                    : <Signed />
                }
            </div>
        )
    }
}

function mapDispatchToProps(dispath){
    return bindActionCreators({
        login : login,
        fetchAndInitialize : fetchAndInitialize
    }, dispath);
}

function mapStateToProps(state){
    const {
        entryData,
        userData,
        productionData
    } = state;
    return { 
        EntryData : entryData,
        Loaded    : 'rubricData && userData && userAssessments'
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);