var React = require('react');
var TodoList = require('./todolist.react');
var TodoForm = require('./todoform.react');
var TodoCount = require('./todocount.react');

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

module.exports = TodoBox;