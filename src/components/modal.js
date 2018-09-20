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

        const modal = (
            <ResponsiveModal open={this.state.open} onClose={this.props.onClose} center  id={this.props.id} >
                {this.props.children}
            </ResponsiveModal>
        );

        return (
            <div>
                {this.state.open ? modal : null}
            </div>
        )
    }
}