import React, { Component } from 'react';

import Generalpage from './generalPage';

import TopBar from './topBar';

export default class App extends Component {
  render() {
    return (
    	<div className="container-fluid">
	    	<div style = {{ maxWidth : '1400px', maxHeight : '100%' }}>
	    	<TopBar />
		    <section className = 'page-content'>
                <div className = 'page-content-inner'>
                    <nav className = 'top-submenu top-submenu-with-background' />
                    <Generalpage />
			  	</div>
			</section>
			  </div>
		  </div>
    );
  }
}
