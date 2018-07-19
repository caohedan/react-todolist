import React, { Component } from 'react';

export default class TodoList extends Component {
  constructor(props) {
    super();
  }
  checkItem = id => {
    let item = this.props.todoList.find(x => x.id == id);
    if (item !== undefined) {
      item.complete = !item.complete;
    }

    this.props.checkItem(this.props.todoList);
  };
  handOnKeyPress = (event, itemId) => {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == '13') {
      event.target.setAttribute('contentEditable', false);
      this.state.todos.find(element => element.id === itemId).content =
        event.target.innerText;
    }
  };
  edit = (event, id) => {
    event.target.setAttribute('contentEditable', 'true');
    event.target.focus();
  };
  render() {
    let list = [];
    // alert(this.state.todos[0])
    list = this.props.todoList.map(element => (
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
    ));
    return <ol>{list}</ol>;
  }
}
