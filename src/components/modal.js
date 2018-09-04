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
            <ResponsiveModal open={this.state.open} onClose={this.props.onClose} center>
                <h2>Header</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                    pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                    hendrerit risus, sed porttitor quam.
                </p>
            </ResponsiveModal>
        );

        return (
            <div className="modal-wrapper">
                {this.state.open ? modal : null}
            </div>
        )
    }
}