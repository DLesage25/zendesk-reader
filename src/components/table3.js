import React, { Component } from 'react';
import ReactTable from 'react-table';

export default class Table extends Component {

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
                    <ReactTable
                      className="-highlight"
                      data={Object.values(this.props.data)} 
                      columns={columns}
                      defaultPageSize={5}
                      showPageSizeOptions={false}
                      style={{borderRadius: '5px'}}
                    />
                  }
              </div>
    )
}
}