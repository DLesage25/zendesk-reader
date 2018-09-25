import React, { Component } from 'react';
import ReactTable from 'react-table';
import {CSVLink} from 'react-csv';
const moment = require('moment');

export default class QueueTable extends Component {

constructor(props) {
  super(props);

  this.state = {
      open: false,
      tableColumns: []
  };
}

componentDidMount() {
  let columns = [];

  let defaultColumn = {
    Header: '',
    accessor: ''
  }

  let columnNames = Object.keys(Object.values(this.props.data)[0]);

  columnNames.map(name => {
    let newColumnObject = JSON.parse(JSON.stringify(defaultColumn));
    newColumnObject.Header = name.charAt(0).toUpperCase() + name.slice(1);;
    newColumnObject.accessor = name;
    columns.push(newColumnObject);
  })

  let tableColumns = [{
    Header: <span> <b>Queue Volume Breakdown</b> </span>,
    headerClassName: 'production',
    columns: columns
  }]

  this.setState({tableColumns})

}


render() {

  return (
              <div>
                  { !this.props.data ? <p> Loading </p> :
                    <div>
                      <ReactTable
                        className="-highlight"
                        data={Object.values(this.props.data)} 
                        columns={this.state.tableColumns}
                        defaultPageSize={5}
                        showPageSizeOptions={false}
                        style={{borderRadius: '5px'}}
                      />
                      <CSVLink data={Object.values(this.props.data)} filename={'Queue_Volume_Report_' + moment().format('MM_DD_YYYY_hh_mm') + '.csv'} className="btn btn-secondary drilldown-download">Download</CSVLink>
                    </div>
                  }
              </div>
    )
}
}