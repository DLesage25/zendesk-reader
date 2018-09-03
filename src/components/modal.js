import React, { Component } from 'react';

import ResponsiveModal from 'react-responsive-modal';


export default class Modal extends Component {
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
        return (
            <div className="example">
                <ResponsiveModal open={this.state.open} onClose={this.props.onClose} center>
                <h2>Header</h2>
                <p>
                    Text
                </p>
                </ResponsiveModal>
            </div>
        );
    }
}