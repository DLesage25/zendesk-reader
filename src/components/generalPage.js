import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import moment from 'moment';

import { getLinegraphData } from '../actions';

import IndividualLinegraphRenderer from './individualLinegraphRenderer'
import TeamLinegraphRenderer from './teamLinegraphRenderer'
import ProductivityCard from './productivityCard'
import CardComponent from './cardComponent'

import Table from './table3'
import Radargraph from './radarGraph'
import Bargraph from './barGraph' 

class Generalpage extends Component {

    constructor(props){
        super(props);

        this.state = {
            globalDate: 'globalDate' in this.props.StartupData.appSettings ? this.props.StartupData.appSettings.globalDate : moment().format('mm/dd/yyyy'),
            globalProgram: 'globalProgram' in this.props.StartupData.appSettings ? this.props.StartupData.appSettings.globalProgram: 'khan'
        };

        this.changeGlobalDate = this.changeGlobalDate.bind(this);
    }

    changeGlobalDate(newDate) {
        this.props.getLinegraphData(this.props.StartupData.programData, this.props.StartupData.productivityData)
        this.setState(Object.assign(this.state, { globalDate: newDate }))
    }

    // changeGlobalProgram(newProgram) {
    //     //this will trigger a re-download of all data

    //     // this.props.getLinegraphData(this.props.StartupData.programData, this.props.StartupData.productivityData)
    //     // this.setState({
    //     //     ...this.state,
    //     //     globalProgram: newProgram 
    //     // })
    // }

    getDateList(productivityData){
        return Object.keys(productivityData).reverse();
    }

    componentWillMount() {
        this.props.getLinegraphData(this.props.StartupData.programData, this.props.StartupData.productivityData)
    }

	render() {
        const { StartupData, GraphData } = this.props;
        //to-do: remove getlinegraphdata from getdatelist function and prevent it from mutating
		return (
		    	<div className="col-large" style={{ marginTop: '70px', width: '100%' }}>
		      		    { !StartupData  ? <p> Loading </p> : 
                            <ProductivityCard 
                                            globalDate={this.state.globalDate}
                                            globalProgram={this.state.globalProgram}
                                            dateList={this.getDateList(StartupData.productivityData)} 
                                            changeGlobalDate={this.changeGlobalDate} 
                                            programList={StartupData.appSettings.programList}>
                                <h4 className="card-body-title"> Team </h4> 
    			    		   { !GraphData ? <p> Loading </p> : <TeamLinegraphRenderer 
                                                                    TeamGraphData={Object.assign(GraphData)} 
                                                                    globalDate={this.state.globalDate} /> }
                                <hr />
                                <h4 className="card-body-title"> Individual </h4>
    			    		   { !GraphData ? <p> Loading </p> : <IndividualLinegraphRenderer 
                                                                    IndividualGraphData={Object.assign(GraphData.individualGraphData)} 
                                                                    globalDate={this.state.globalDate}/> }
		      		    </ProductivityCard> }
		    	</div>
				)
	}
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getLinegraphData : getLinegraphData
    }, dispatch);
}

function mapStateToProps(state){
    const {
        graphData
    } = state;
    return { 
        GraphData : graphData
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Generalpage);