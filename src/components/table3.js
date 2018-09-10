import React, { Component } from 'react';
import ReactTable from 'react-table';

export default class Table extends Component {

constructor(props) {
  super(props);

}


render() {
  // const data = [{
  //   name: 'Tanner Linsley',
  //   loggedTime: '01:13:00',
  //   production: {
  //     publicComments: 5,
  //     goal: {
  //       type: 'publicComments',
  //       value: 10
  //     },
  //     solved: 23,
  //     pending: 15,
  //     open: 0
  //   }
  // },{
  //   name: 'John Doe',
  //   loggedTime: '02:25:00',
  //   production: {
  //     publicComments: 21,
  //     goal: {
  //       type: 'publicComments',
  //       value: 23
  //     },
  //     solved: 31,
  //     pending: 6,
  //     open: 3
  //   }
  // }]

  const columns = [{
    Header: <span> <b>Production</b> </span>,
    headerClassName: 'production',
    columns: [{
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }, {
      Header: 'Logged time',
      accessor: 'loggedTime',
      Cell: props => <span className='someclass'>{props.value}</span> // Custom cell components!
    }, {
      id: 'publicComments', // Required because our accessor is not a string
      Header: 'Public Comments',
      accessor: d => d.production.publicComments + '/' + d.production.goal.value // Custom value accessors!
    }]
  }, {
    Header: <span> <b>Status breakdown</b> </span>,
    headerClassName: 'status-breakdown',
    columns: [{
      Header: props => <span>Solved</span>, // Custom header components!
      accessor: 'production.solved'
    }, {
      Header: props => <span>Pending</span>, // Custom header components!
      accessor: 'production.pending'
    }, {
      Header: props => <span>Open</span>, // Custom header components!
      accessor: 'production.open'
    }]
  }]

  return (
    <ReactTable
      className="-highlight"
      data={this.props.data}
      columns={columns}
      defaultPageSize={5}
      showPageSizeOptions={false}
      style={{borderRadius: '5px'}}
    />
    )
}
}