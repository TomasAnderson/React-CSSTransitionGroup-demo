var React = require('react/addons');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var todosData = [
  { task: "Buy groceries", due: new Date(new Date().getTime() - 86400000), completed: false },
  { task: "Do laundry", due: new Date(new Date().getTime() - 3600000), completed: true },
  { task: "Build React Todo App", due: new Date(), completed: false }
];

var TodoBox = React.createClass({

  getInitialState: function() {
    return {
      todos: todosData 
    };
  },

  render: function () {
    return (
      <div className="todo--box">
        <TodoList 
          todos={this.state.todos} 
          handleItemCheck={this.toggleCompletionStatus} 
          handleItemDelete={this.deleteItem}
        />
        <TodoForm handleTodoSubmit={this.addNewTodo}/>
        <TodoCount todos={this.state.todos} />
      </div>
    );
  },

  addNewTodo: function (task) {
    var newTodos = this.state.todos;
    newTodos.push({
      task:task,
      due: new Date(),
      completed: false
    });

    this.setState({
      todos: newTodos
    });
  },

  toggleCompletionStatus: function (index) {
    var newTodos = this.state.todos;
    newTodos[index].completed = !newTodos[index].completed;
    this.setState({todos:newTodos});
  },

  deleteItem: function (index) {
    var newTodos = this.state.todos.slice();
    newTodos.splice(index, 1);
    this.setState({todos:newTodos});
  }

});

var TodoList = React.createClass({
  render: function () {
    var todoNodes = this.props.todos.map(function (todo, index) {
      return (
        <TodoItem 
          todo={todo} 
          index={index} 
          handleItemDelete={this.props.handleItemDelete}
          handleItemCheck={this.props.handleItemCheck} 
          key={todo.due}
        />
      );
    }.bind(this));

    return (
      <ul className="todo--list">
        {todoNodes}
      </ul>
    );
  }
});

var TodoItem = React.createClass({

  handleCheckBoxChange: function () {
    this.props.handleItemCheck(this.props.index);
  },

  handleDelete: function (e) {
    e.preventDefault();
    this.props.handleItemDelete(this.props.index);
  },

  render: function () {
    return (
        <li className="todo--item" key={this.props.todo.due}>
          <div className="todo--completed">
            <input type="checkbox" checked={this.props.todo.completed} onChange={this.handleCheckBoxChange} />  
          </div>
          <div className="todo--delete">
            <input type="submit" value="delete" onClick={this.handleDelete} />  
          </div>
          <div className="todo--details">
            <div className="todo--task">{this.props.todo.task}</div>
            <div className="todo--due">{this.props.todo.due.toString()}</div>
          </div>  
        </li>
    );
  }

})

var TodoForm = React.createClass({

  _handleFormSubmit: function (e) {
    e.preventDefault();
    var inputEl = ReactDOM.findDOMNode(this.refs.inputText);
    this.props.handleTodoSubmit(inputEl.value.trim())
    inputEl.value = '';
  },

  render: function () {
    return (
      <form className="todo--form" onSubmit={this._handleFormSubmit} >
        <label for="todo--input">Add a new task</label>
        <input type="text" name="todo--input" class="todo--input" placeholder="I want to..."  ref="inputText" />
        <input type="submit" value="Add" />
      </form>
    );
  }
});


var TodoCount = React.createClass({
  render: function () {
    var totalCount = this.props.todos.length;
    var pendingCount = this.props.todos.filter(function (todo) {
      return !todo.completed;
    }).length;

    return (
      <div className="todo--count">
        {totalCount} items, <strong>{pendingCount} not completed</strong>
      </div>
    );
  }
});

React.render(
  <TodoBox />,
  document.getElementById('app')
)