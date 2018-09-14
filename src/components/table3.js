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
  const data2 = [{
    hour: '7:00 AM',
    name: 'Tanner Linsley',
    publicComments: 5,
    goal: 10,
    goalType: 'publicComments',
    solved: 23,
    pending: 15,
    open: 0
  }, {
    hour: '8:00 AM',
    name: 'Tanner Linsley',
    publicComments: 15,
    goal: 12,
    goalType: 'publicComments',
    solved: 23,
    pending: 15,
    open: 0
  }, {
    hour: '9:00 AM',
    name: 'Tanner Linsley',
    publicComments: 8,
    goal: 14,
    goalType: 'publicComments',
    solved: 23,
    pending: 15,
    open: 0
  }]

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
    console.log(this.props.data, data2)
  return (
              <div>
                  { !data2.length ? <p> Loading </p> :
                    <ReactTable
                      className="-highlight"
                      data={data2} 
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