import React, { Component } from 'react';
import ReactTable from 'react-table';
import {CSVLink} from 'react-csv';
const moment = require('moment');

export default class GeneralDrillDownTable extends Component {

constructor(props) {
  super(props);

  this.state = {
      open: false,
  };
}


render() {

  const columns = [{
    Header: <span> <b>Production</b> </span>,
    headerClassName: 'production',
    columns: [{
      Header: 'Hour',
      accessor: 'hour' 
    }, {
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Goal',
      accessor: 'goal'
    }]
  }, {
      Header: <span> <b>Status breakdown</b> </span>,
      headerClassName: 'status-breakdown',
      columns: [{
        Header: 'PCs',
        accessor: 'publicComments'
      }, {
        Header: 'Solved',
        accessor: 'solved'
      }, {
        Header: 'Pending',
        accessor: 'pending'
      }, {
        Header: 'Open',
        accessor: 'open'
      }]
  }] 

  //this.props.data is not being read 
  return (
              <div>
                  { !this.props.data ? <p> Loading </p> :
                    <div>
                      <ReactTable
                        className="-highlight"
                        data={this.props.data} 
                        columns={columns}
                        defaultPageSize={10}
                        showPageSizeOptions={false}
                        style={{borderRadius: '5px'}}
                      />
                      <CSVLink data={this.props.data} filename={'Production_Report_' + moment().format('MM_DD_YYYY_hh_mm') + '.csv'} className="btn btn-secondary drilldown-download">Download</CSVLink>
                    </div>
                  }
              </div>
    )
}
}