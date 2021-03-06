var React = require('react');
var TodoItem = require('./todoitem.react');
// var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var Collapse = require('./collapse.react');


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
          <Collapse className="list--content" key="list--content">
            {todoNodes}
          </Collapse>
        </ul>
      </div> 

    );
  }
});


module.exports = TodoList;

