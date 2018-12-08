import React, { Component } from 'react';
import ReactTable from 'react-table'

export default class Table extends Component {

    constructor(props){
        super(props);

        var bodyWidth = 'col-lg-6';
        //this.onClick        = this.onClick.bind(this);
        render() {
    const data = [{
        name: 'Tanner Linsley',
        age: 26,
        friend: {
          name: 'Jason Maurer',
          age: 23,
        }
      }
    }]

    const columns = [{
        Header: 'Name',
        accessor: 'name' // String-based value accessors!
      }, {
        Header: 'Age',
        accessor: 'age',
        Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
      }, {
        id: 'friendName', // Required because our accessor is not a string
        Header: 'Friend Name',
        accessor: d => d.friend.name // Custom value accessors!
      }, {
        Header: props, // Custom header components!
        accessor: 'friend.age'
  }]

        this.state = {
            //value          : 'selected' in this.props ? this.props.selected : false,
            open           : false,
            focused_btn    : false,
            focused_choice : false,
            size: 'size' in this.props ? this.props.size : 'col-lg-6',
            title : 'title' in this.props ? this.props.title : 'card title',
            description: 'description' in this.props ? this.props.description : '<default description>',
            body: 'body' in this.props ? this.props.body : 'card body',
            bodyWidth: bodyWidth,
            marginBottom: 'marginBottom' in this.props ? this.props.marginBottom: '0px',
            data: data,
            columns: columns
        };

		if (this.props.size !== 'col-lg-6') this.state.bodyWidth = '100%';
    }

	render() {

		return (
	            <div className={ this.state.size } style={{ marginBottom: this.state.marginBottom }}>
                    <ReactTable data={this.state.data} columns={this.state.columns} />
	            </div>
				)
	}
}