import React, { Component } from 'react';

export default class ScrollDetector extends Component {
    constructor(props){
        super(props);

        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll(event) {
        let scrollTop = window.scrollY

        this.props.updateScroll(scrollTop)
    }
    
	render() {
		return (
				<div>
				</div>	
				)
	}	
}