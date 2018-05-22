import React, { Component } from 'react';

import BookList from '../containers/book-list';

export default class App extends Component {
  render() {
    return (
    	<div className="container-fluid">
	    	<div style = {{ maxWidth : '1400px', maxHeight : '100%' }}>
		            <nav className = 'top-menu'>
		                <div className = 'menu-icon-container hidden-md-up'>
		                    <div className = 'animate-menu-button left-menu-toggle'>
		                        <div />
		                    </div>
		                </div>
						this is a test
		            </nav>
		    <section className = 'page-content'>
                <div className = 'page-content-inner'>
                    <nav className = 'top-submenu top-submenu-with-background'>
                        <div className = 'row' style = {{ height:'100%'}} >
				    <div className="col-3">
				      One of three columns
				    </div>
				    <div className="col-md">
				      One of three columns
				    </div>
				  </div>
				  </nav>
				  </div>
			</section>
			  </div>
		  </div>
    );
  }
}
