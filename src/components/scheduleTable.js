import React, { Component } from 'react';
import ReactTable from 'react-table';

export default class Table extends Component {

constructor(props) {
  super(props);
  ///////// this should be erased //////////
  data = [{
    email: 'daniel@partnerhero.com',
    dailyGoal: 25,
    shiftDuration: 9,
    schedules: {
         0: {
        startTime: 9,
        active: true
      }, 1: {
        startTime: 9,
        active: false
      }, 2: {
        startTime: 9,
        active: true
      }, 3: {
        startTime: 9,
        active: true
      }, 4: {
        startTime: 9,
        active: true
      }, 5: {
        startTime: 9,
        active: true
      }, 6: {
        startTime: 9,
        active: true
      }
    }
  },{
    name: 'John Doe',
    email: 'john.cook@partnerhero.com',
    production: {
      publicComments: 21,
      goal: {
        type: 'publicComments',
        value: 23
      },
      solved: 31,
      pending: 6,
      open: 3
    }
  }]

    this.state = {
      data: data
    };

  this.renderEditable = this.renderEditable.bind(this);
}

renderEditable(cellInfo) {
  return (
    <div
      style={{ backgroundColor: "#fff" }}
      contentEditable
      suppressContentEditableWarning
      onBlur={e => {
        const data = [...this.state.data];
        data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
        this.setState({ data });
      }}
      dangerouslySetInnerHTML={{
        __html: this.state.data[cellInfo.index][cellInfo.column.id]
      }}
    />
  );
}

  render() {
    const { data } = this.state;
    const days = [{
            name: 'Sun',
            index: 0
          }, {
            name: 'Mon',
            index: 1
          }, {
            name: 'Tues',
            index: 2
          }, {
            name: 'Wed',
            index: 3
          }, {
            name: 'Thurs',
            index: 4
          }, {
            name: 'Fri',
            index: 5
          }, {
            name: 'Sat',
            index: 6
          }]

    const columns = [{
      Header: <span> User Info </span>,
      headerClassName: 'user info',
      columns: [{
        Header: 'Email',
        accessor: 'email',
        minWidth: 200,
        Cell: this.renderEditable
      }, {
        id: 'dailyGoal', 
        Header: 'Daily Goal',
        accessor: 'dailyGoal',
        Cell: this.renderEditable
      }, {
        id: 'shiftDuration', 
        Header: 'Shift Duration',
        accessor: d => d.shiftDuration + ' hours', //d => d.production.publicComments 
        minWidth: 150,
        Cell: this.renderEditable
      }]
    }, {
      Header: <span> Start times (UTC) </span>,
      headerClassName: 'schedules',
      columns: days.map((day) => {
            return {
                Header: props => <span>{ day.name }</span>, 
                accessor: 'schedules.' + day.index + '.startTime',
                maxWidth: 80,
                Cell: this.renderEditable
            }
        })
    }]

  return (
      <ReactTable
        className="-highlight"
        data={data}
        columns={columns}
        defaultPageSize={5}
        showPageSizeOptions={false}
        style={{borderRadius: '5px'}}
      />
    )
  }
}