import React, { Component } from 'react';

export default class SettingsProgram extends Component {
    constructor(props){
        super(props);

        this.state = {
            
        };
    }

	render() {

		return (
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
		)
	}

}