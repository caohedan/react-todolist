import React, { Component } from 'react';
import TodoList from './Components/TodoList';
export default class Todo extends Component {
  constructor(props) {
    super();
    this.state = {
      todos: [],
      statusOfList: 'all'
    };
  }

  addItem = event => {
    let toAdd = event.target.previousSibling.value;
    let list = this.state.todos;
    list.push({ id: this.generateUUID(), name: toAdd, complete: false });
    this.setState({ todos: list });
    event.target.previousSibling.value = '';
  };
  checkItem = e => {
    this.setState({ todos: e });
  };
  setStatusofListByStatus = status => {
    this.setState({ statusOfList: status });
    console.log(this.state.statusOfList);
  };

  filterByStatus = (todos, status) => {
    const filterExecuter = {
      all() {
        return true;
      },
      active(element) {
        return !element.complete;
      },
      complete(element) {
        return element.complete;
      }
    };
    const result = todos.filter(filterExecuter[status]);
    return result;
  };

  render() {
    return (
      <div>
        <div>
          <input className="input-text" type="text" name="ListItem" />
          <div id="button" onClick={this.addItem}>
            Add
          </div>
        </div>
        <br />
        <TodoList
          todoList={this.filterByStatus(
            this.state.todos,
            this.state.statusOfList
          )}
          checkItem={e => this.checkItem(e)}
        />
        <ul id="filters">
          <li>
            <a
              href="#"
              data-filter="all"
              onClick={() => this.setStatusofListByStatus('all')}
              className="selected"
            >
              ALL
            </a>
          </li>
          <li>
            <a
              href="#"
              data-filter="active"
              onClick={() => this.setStatusofListByStatus('active')}
              className=""
            >
              Active
            </a>
          </li>
          <li>
            <a
              href="#"
              data-filter="complete"
              onClick={() => this.setStatusofListByStatus('complete')}
              className=""
            >
              Complete
            </a>
          </li>
        </ul>
      </div>
    );
  }

  generateUUID = () => {
    /*jshint bitwise:false */
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
      random = (Math.random() * 16) | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) {
        uuid += '-';
      }
      uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(
        16
      );
    }
    return uuid;
  };
}
