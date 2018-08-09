import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import moment from 'moment';

import SettingsCard from './settingsCard'

class GeneralSettings extends Component {

    constructor(props){
        super(props);

        this.state = {};
    }
    // componentWillMount() {
    //     this.props.getSettings(this.props.StartupData.programData, this.props.StartupData.productivityData)
    // }

	render() {
        console.log('settings props', this.props)
        //to-do: remove getlinegraphdata from getdatelist function and prevent it from mutating
		return (
		    	<div className="col-large" style={{ marginTop: '70px', width: '100%' }}>
                    <SettingsCard >
                        <div className="container">
                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="basic-url">Program Name</label>
                                    <div className="input-group mb-3">
                                      <input type="text" className="form-control" placeholder="Acme corp" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                    <label htmlFor="basic-url">Zendesk URL</label>
                                    <div className="input-group mb-3">
                                      <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon3">https://</span>
                                      </div>
                                      <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                      <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon2">.zendesk.com</span>
                                      </div>
                                    </div>

                                    <label htmlFor="basic-url">Manager Email</label>
                                    <div className="input-group mb-3">
                                      <input type="text" className="form-control" placeholder="someone" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                      <div className="input-group-append">
                                        <span className="input-group-text" id="basic-addon2">@partnerhero.com</span>
                                      </div>
                                    </div>
                                </div>

                                <div className="col-sm">
                                    <div style={{marginBottom: '1rem'}}> 
                                        <label htmlFor="basic-url">Goal Type</label>
                                        <br />
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                          <button type="button" className="btn btn-secondary active">Touches</button>
                                          <button type="button" className="btn btn-secondary">Solved</button>
                                          <button type="button" className="btn btn-secondary">Chats</button>
                                        </div>
                                    </div>
                                    <div> 
                                        <label htmlFor="basic-url">Olark Chats</label>
                                        <br />
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                          <button type="button" className="btn btn-secondary">True</button>
                                          <button type="button" className="btn btn-secondary active">False</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SettingsCard >
		    	</div>
				)
	}
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state){
    const {
    } = state;
    return { 
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralSettings);