var React = require('react');

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


module.exports = TodoCount;