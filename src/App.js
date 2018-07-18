import React, { Component } from 'react';
import './todo.css';
import Todo from './Todo';
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <div className="container">
          <div>
            <h2>Jquery To Do List</h2>
            <p>
              <em>Simple Todo List with adding and filter by diff status.</em>
            </p>
          </div>
          <div id="todoForm">
            <Todo />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
