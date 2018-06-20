import React, { Component } from 'react';

export default class Table extends Component {

    constructor(props){
        super(props);

        //this.onClick        = this.onClick.bind(this);
        this.state = {
          data: 'data' in this.props ? this.props.data : null
        };

        
    }

	render() {

		return (
                <table className="table table-hover">
                    <thead>
                        <tr>
                          <th className="active"> Name </th>
                          <th className="success"> Public comments </th>
                          <th className="warning"> Solved </th>
                          <th className="danger"> Pending </th>
                          <th className="info"> Open </th>
                          <th className="info"> On hold </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <td className="active"> John Doe </td>
                          <td className="success"> 25 / 20 </td>
                          <td className="warning"> 20 </td>
                          <td className="danger"> 15 </td>
                          <td className="info"> 12 </td>
                          <td className="info"> 10 </td>
                        </tr>
                        <tr>
                          <td className="active"> Karl Marx </td>
                          <td className="success"> 15 / 20 </td>
                          <td className="warning"> 20 </td>
                          <td className="danger"> 5 </td>
                          <td className="info"> 1 </td>
                          <td className="info"> 2 </td>
                        </tr>
                        <tr>
                          <td className="active"> Edgar Poe </td>
                          <td className="success"> 24 / 20 </td>
                          <td className="warning"> 13 </td>
                          <td className="danger"> 8 </td>
                          <td className="info"> 5 </td>
                          <td className="info"> 0 </td>
                        </tr>
                        <tr>
                          <td className="active"> Carl Johnson </td>
                          <td className="success"> 14 / 15 </td>
                          <td className="warning"> 25 </td>
                          <td className="danger"> 14 </td>
                          <td className="info"> 15 </td>
                          <td className="info"> 0 </td>
                        </tr>
                        <tr>
                          <td className="active"> Joe Edgar </td>
                          <td className="success"> 16 / 15 </td>
                          <td className="warning"> 23 </td>
                          <td className="danger"> 65 </td>
                          <td className="info"> 25 </td>
                          <td className="info"> 25 </td>
                        </tr>
                    </tbody>
                </table>
				)
	}
}