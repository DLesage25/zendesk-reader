import React, { Component } from 'react';

import ResponsiveModal from 'react-responsive-modal';
import Table from './table3';

export default class DrilldownModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            open: false,
        };
    }

    componentDidMount() {
      this.setState({ open: this.props.open }); 
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ open: nextProps.open });
    }

    render() {

        const modal = (
            <ResponsiveModal open={this.state.open} onClose={this.props.onClose} center>
                <h2>Team Performance</h2>
                <Table data={this.props.modalData} />
            </ResponsiveModal>
        );

        return (
            <div className="modal-wrapper">
                {this.state.open ? modal : null}
            </div>
        )
    }
}