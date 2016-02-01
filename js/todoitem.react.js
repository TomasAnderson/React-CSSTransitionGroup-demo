var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TodoItem = React.createClass({

  getInitialState: function() {
    return {
      isExpanded: false, 
      divs:   
          <li className="todo--item" key="todo--item">
            <button key={'abc'} type="button" onClick={this.toggleExpanded}>
              show
            </button>
            <p>{this.props.todo.task}</p>
          </li>
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
    var newDivs ;
    if(!this.state.isExpanded) {
      newDivs = 
            <li className="todo--item" key="todo--item">
            <button key={'abc'} type="button" onClick={this.toggleExpanded}>
              {this.state.expanded ? 'hide' : 'show'}
            </button>
            <input type="checkbox" checked={this.props.todo.completed} onChange={this.handleCheckBoxChange} />  
            <input type="submit" value="delete" onClick={this.handleDelete} />  
            <p>{this.props.todo.task}</p>
            <p>{this.props.todo.due.toString()}</p>
          </li>;

    } else {
      newDivs = 
          <li className="todo--item" key="todo--item">
            <button key={'abc'} type="button" onClick={this.toggleExpanded}>
              {this.state.isExpanded ? 'hide' : 'show'}
            </button>
            <p>{this.props.todo.task}</p>
          </li>;

    }
    this.setState({
      isExpanded: !this.state.isExpanded,
      divs: newDivs
    });
  },

  render: function () {
    return (
        // <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          this.state.divs
        // </ReactCSSTransitionGroup>
    );

  }

});


module.exports = TodoItem;