var React = require('react');
var TodoItem = require('./todoitem.react');

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
      <div className="TodoList">
        <ul className="todo--list">
          {todoNodes}
        </ul>
      </div> 
    );
  }
});


module.exports = TodoList;