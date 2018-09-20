import React, { Component } from 'react';
import ReactTable from 'react-table';
import Dropdown from './dropdown'

let _ = require('lodash');

export default class Table extends Component {

constructor(props) {
  super(props);

  this.state = {
    programName: this.props.programName ? this.props.programName : '',
    data: []
  };

  this.renderEditable = this.renderEditable.bind(this);
  this.verifyDataIntegrity = this.verifyDataIntegrity.bind(this);
  this.compareObjectsIntegrity = this.compareObjectsIntegrity.bind(this);
  this.onChange = this.onChange.bind(this);

}

componentDidMount() {
  this.verifyDataIntegrity(Object.values(this.props.team));
}

componentWillReceiveProps(nextProps) {

  if(this.state.programName !== nextProps.programName) this.verifyDataIntegrity(Object.values(nextProps.team))

  else if (this.state.data.length < nextProps.state.data.length) this.setState(nextProps)
}

verifyDataIntegrity(team) {

  let dataObjectsPattern = {
    email: '',
    dailyGoal: 0,
    status: 'Active',
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

  let data = [...team];

  let rootNames = Object.keys(this.props.team);

  _.forEach(data, (user, index) => {

    if (!this.compareObjectsIntegrity(dataObjectsPattern, user) || !this.compareObjectsIntegrity(user, dataObjectsPattern)) {

      console.log('comparing')

      let rootName = rootNames[index];

      let newUserObject = JSON.parse(JSON.stringify(dataObjectsPattern));

      newUserObject.email = user.email;

      data[index] = newUserObject;

      this.props.updateProgramTeamUser({newUserObject, rootName});
    }

    if(index === data.length - 1) this.setState({ data })
  });

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

  console.log(column)

  if(column === 'delete') return (<button type="button" className="btn btn-secondary" onClick={(event) => {this.onChange(event, index, column)}}>X</button>);

  let startTime = this.state.data[index][column].startTime;

  if (startTime !== undefined && startTime >= 0) value = startTime;
  else value = this.state.data[index][column];

  let renderCell;

  let options = ['Active', 'Inactive'];

  let inputCell = (<input value={value} onChange={(event) => {this.onChange(event, index, column)}} style={{ backgroundColor: "#fff", width: '100%', height: '100%', border: '0', textAlign: 'left' }}/>);

  let dropdownCell = (<Dropdown current={value} options={options} action={(event) => {this.onChange(event, index, column)}} buttonClassName="main-card-dropdown btn btn-sm btn-outline-primary ml-2 dropdown-toggle" />);

  if(column === 'status') renderCell = dropdownCell;
  else renderCell = inputCell;
  
  return ( renderCell );
}

onChange(event, index, column) {

  console.log(event, index, column)

  let value = event.target ? event.target.value : event;

  let data = [...this.state.data];

  let startTime = data[index][column] !== undefined ? data[index][column].startTime : undefined;

  let newUserObject = data[index];

  let rootNames = Object.keys(this.props.team);

  let rootName = rootNames[index];

  if (startTime !== undefined && startTime >= 0) data[index][column].startTime = value;
  else data[index][column] = value;

  if(column === 'delete') this.props.deleteProgramUser(rootName);
  else this.props.updateProgramTeamUser({newUserObject, rootName});

}

  render() {

    const { data } = this.state;

    const columns = [{
      Header: <span> User Info </span>,
      headerClassName: 'user info',
      columns: [{
        Header: 'Email',
        accessor: 'email',
        minWidth: 282,
        Cell: this.renderEditable
      }, {
        Header: 'Status',
        accessor: 'status',
        minWidth: 88,
        Cell: this.renderEditable
      }, {
        Header: 'Daily Goal',
        accessor: 'dailyGoal',
        minWidth: 78,
        Cell: this.renderEditable
      }, {
        Header: 'Shift Duration',
        accessor: 'shiftDuration', //d => d.production.publicComments 
        minWidth: 116,
        Cell: this.renderEditable
      }]
    }, {
      Header: <span> Start times (UTC) </span>,
      headerClassName: 'schedules',
      columns: [{
            id: 'Sun',
            Header: 'Sun',
            maxWidth: 55,
            Cell: this.renderEditable
          }, {
            id: 'Mon',
            Header: 'Mon',
            maxWidth: 55,
            Cell: this.renderEditable
          }, {
            id: 'Tues',
            Header: 'Tue',
            maxWidth: 55,
            Cell: this.renderEditable
          }, {
            id: 'Wed',
            Header: 'Wed',
            maxWidth: 55,
            Cell: this.renderEditable
          }, {
            id: 'Thurs',
            Header: 'Thu',
            maxWidth: 55,
            Cell: this.renderEditable
          }, {
            id: 'Fri',
            Header: 'Fri',
            maxWidth: 55,
            Cell: this.renderEditable
          }, {
            id: 'Sat',
            Header: 'Sat',
            maxWidth: 55,
            Cell: this.renderEditable
          }, {
            accessor: 'status',
            id: 'delete',
            Header: '',
            maxWidth: 55,
            Cell: this.renderEditable
          }]
    }]

  return (
      <ReactTable
        className="-highlight"
        data={data}
        columns={columns}
        defaultPageSize={10}
        showPageSizeOptions={false}
        style={{borderRadius: '5px'}}
      />
    )
  }
}