var React = require('react');

var TodoForm = React.createClass({

  _handleFormSubmit: function (e) {
    e.preventDefault();
    var inputEl = React.findDOMNode(this.refs.inputText);
    this.props.handleTodoSubmit(inputEl.value.trim())
    inputEl.value = '';
  },

  render: function () {
    return (
      <form className="todo--form" onSubmit={this._handleFormSubmit} >
        <label for="todo--input">Add a new task</label>
        <input type="text" name="todo--input" className="todo--input" placeholder="I want to..."  ref="inputText" />
        <input type="submit" value="Add" />
      </form>
    );
  }
});


module.exports = TodoForm;