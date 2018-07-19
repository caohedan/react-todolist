import React, { Component } from 'react';

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
  checkItem = id => {
    let item = this.state.todos.find(x => x.id == id);
    if (item !== undefined) {
      item.complete = !item.complete;
    }

    this.setState({ todos: this.state.todos });
  };
  setStatusofListByStatus = status => {
    this.setState({ statusOfList: status });
    console.log(this.state.statusOfList);
  };
  edit = (event, id) => {
    event.target.setAttribute('contentEditable', 'true');
    event.target.focus();
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
  handOnKeyPress = (event, itemId) => {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == '13') {
      event.target.setAttribute('contentEditable', false);
      this.state.todos.find(element => element.id === itemId).content =
        event.target.innerText;
    }
  };

  render() {
    let list = [];
    // alert(this.state.todos[0])
    list = this.filterByStatus(this.state.todos, this.state.statusOfList).map(
      element => (
        <li
          onDoubleClick={e => this.edit(e, element.id)}
          onKeyPress={(e, itemId) => this.handOnKeyPress(e, element.id)}
          className={element.complete ? 'checked' : ''}
          key={element.id}
        >
          <input
            name="done-todo"
            type="checkbox"
            className="done-todo"
            onChange={this.checkItem.bind(this, element.id)}
          />
          {element.name}
        </li>
      )
    );
    return (
      <div>
        <div>
          <input className="input-text" type="text" name="ListItem" />
          <div id="button" onClick={this.addItem}>
            Add
          </div>
        </div>
        <br />
        <ol>{list}</ol>
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
