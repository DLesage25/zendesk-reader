import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import Signed                 from './signed';
import { 
    login,
    fetchAndInitialize
}                             from '../actions';

class App extends Component {
    constructor(props){
        super(props);
        if(!this.props.EntryEmail) this.props.login();
    }

    componentDidUpdate(){
        console.log('componentDidUpdate');
        if(this.props.EntryEmail && !this.props.Loaded) this.props.fetchAndInitialize(this.props.EntryEmail);
    }

    render() {
        console.log('app props', this.props)
        const { EntryEmail, StartupData, Loaded } = this.props;
        if(!EntryEmail) return <div style ={{maxWidth:'1400px'}}> Logging in ... </div>;
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
                    : <Signed data={StartupData} />
                }
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        login : login,
        fetchAndInitialize : fetchAndInitialize
    }, dispatch);
}

function mapStateToProps(state){
    const {
        entryEmail,
        startupData
    } = state;
    return { 
        EntryEmail : entryEmail,
        StartupData : startupData,
        Loaded    : startupData
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(App);