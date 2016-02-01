var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TodoItem = React.createClass({

  getInitialState: function() {
    return {
      isExpanded: false, 
    };
  },

  handleCheckBoxChange: function () {
    this.props.handleItemCheck(this.props.index);
  },

  handleDelete: function (e) {
    e.preventDefault();
    this.props.handleItemDelete(this.props.index);
  },

  toggleExpanded: function () {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  },

  render: function () {

    var checkboxDiv =
        <div key = "todo--item">            
          <input type="checkbox" checked={this.props.todo.completed} onChange={this.handleCheckBoxChange} />  
        </div> 
    var checkboxDiv = this.state.isExpanded? checkboxDiv: null;

    var deleteButtonDiv = 
        <div key = "delete--button">
          <input type="submit" value="delete" onClick={this.handleDelete} />  
          <p>{this.props.todo.due.toString()}</p>
        </div>
    var deleteButtonDiv = this.state.isExpanded? deleteButtonDiv: null; 


    return (
          <li className="todo--item" key="todo--item">
            <button key={'abc'} type="button" onClick={this.toggleExpanded}>
              {this.state.isExpanded ? 'hide' : 'show'}
            </button>
            <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              {checkboxDiv}
            </ReactCSSTransitionGroup>
            <p>{this.props.todo.task}</p>
            <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
              {deleteButtonDiv}
            </ReactCSSTransitionGroup>
          </li>
    );

  }

});


module.exports = TodoItem;