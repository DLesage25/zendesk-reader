import React, { Component } from 'react';
import ReactTable from 'react-table';

let _ = require('lodash');

export default class Table extends Component {

constructor(props) {
  super(props);

  this.data = Object.values(this.props.team)

  this.state = {
    data: []
  };

  this.renderEditable = this.renderEditable.bind(this);
  this.verifyDataIntegrity = this.verifyDataIntegrity.bind(this);
  this.compareObjectsIntegrity = this.compareObjectsIntegrity.bind(this);
  this.onChange = this.onChange.bind(this);
  this.createNewUser = this.createNewUser.bind(this);
  this.pushNewUserInputToTable = this.pushNewUserInputToTable.bind(this);


  this.rootNames = Object.keys(this.props.team);

}

componentDidMount() {
  this.verifyDataIntegrity();
}

verifyDataIntegrity() {
  console.log('verifying data')

  let dataObjectsPattern = {
    email: '',
    dailyGoal: 0,
    shiftDuration: 0,
    Sun: {
      startTime: 0,
      active: true
    },
    Mon: {
      startTime: 0,
      active: true
    }, 
    Tues: {
      startTime: 0,
      active: true
    }, 
    Wed: {
      startTime: 0,
      active: true
    }, 
    Thurs: {
      startTime: 0,
      active: true
    }, 
    Fri: {
      startTime: 0,
      active: true
    }, 
    Sat: {
      startTime: 0,
      active: true
    }
  }

  let data = [...this.data];

  console.log('complete data', data)

  _.forEach(data, (user, index) => {

    console.log(this.compareObjectsIntegrity(user, dataObjectsPattern), user, dataObjectsPattern)

    if (!this.compareObjectsIntegrity(user, dataObjectsPattern)) {

      let rootName = this.rootNames[index];

      let newUserObject = JSON.parse(JSON.stringify(dataObjectsPattern));

      newUserObject.email = user.email;

      data[index] = newUserObject;

      this.props.updateProgramTeamUser({newUserObject, rootName});
    }

    if(index === data.length - 1) this.setState({ data }, () => {this.pushNewUserInputToTable(dataObjectsPattern)})
  });

}

pushNewUserInputToTable(dataObjectsPattern) {
  let data = [...this.state.data];

  let newUserObject = JSON.parse(JSON.stringify(dataObjectsPattern));

  if(data[data.length - 1] !== ''){
    data.push(newUserObject);
    this.setState({ data} )
  }
  return;
}

createNewUser() {
  
  let data = this.state.data;

  let newUserObject = data[data.length - 1];

  newUserObject.email = data[data.length].email;

  let rootName = newUserObject.email.replace(/./g, '_');

  this.props.updateProgramTeamUser({newUserObject, rootName});

}

compareObjectsIntegrity(obj, objCompare){
    var equal = true;
    for (i in obj)
        if (!objCompare.hasOwnProperty(i))
            equal = false;
    return equal;
}

renderEditable(cellInfo) {

  let value;

  let index = cellInfo.index;

  let column = cellInfo.column.id;

  let startTime = this.state.data[index][column].startTime;

  if (startTime !== undefined && startTime >= 0) value = startTime;
  else value = this.state.data[index][column];
  
  return (
    <input value={value} onChange={(event) => {this.onChange(event, index, column)}} style={{ backgroundColor: "#fff", width: '100%', height: '100%', border: '0' }}/>
  );
}

onChange(event, index, column) {

  let value = event.target.value;

  let data = [...this.state.data];

  let startTime = data[index][column].startTime;

  let newUserObject = data[index];

  let rootName = this.rootNames[index];

  if (startTime !== undefined && startTime >= 0) data[index][column].startTime = value;
  else data[index][column] = value;

  this.props.updateProgramTeamUser({newUserObject, rootName});

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
        minWidth: 250,
        Cell: this.renderEditable
      }, {
        Header: 'Daily Goal',
        accessor: 'dailyGoal',
        Cell: this.renderEditable
      }, {
        Header: 'Shift Duration',
        accessor: 'shiftDuration', //d => d.production.publicComments 
        minWidth: 150,
        Cell: this.renderEditable
      }]
    }, {
      Header: <span> Start times (UTC) </span>,
      headerClassName: 'schedules',
      columns: [{
            id: 'Sun',
            Header: 'Sun',
            Cell: this.renderEditable
          }, {
            id: 'Mon',
            Header: 'Mon',
            Cell: this.renderEditable
          }, {
            id: 'Tues',
            Header: 'Tue',
            Cell: this.renderEditable
          }, {
            id: 'Wed',
            Header: 'Wed',
            Cell: this.renderEditable
          }, {
            id: 'Thurs',
            Header: 'Thu',
            Cell: this.renderEditable
          }, {
            id: 'Fri',
            Header: 'Fri',
            Cell: this.renderEditable
          }, {
            id: 'Sat',
            Header: 'Sat',
            Cell: this.renderEditable
          }]
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