var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TodoItem = React.createClass({

  getInitialState: function() {
    return {
      isExpanded: true, 
      divs: []
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
    if(this.state.isExpanded) {
      newDivs = <li className="todo--item" key={this.props.todo.due}>
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
        </li>;
    } else {
      newDivs = <li className="todo--item" key={this.props.todo.due}><div className="todo--details" >
                <div className="todo--task">{this.props.todo.task}</div>
             </div></li>;
    }
    this.setState({
      isExpanded: !this.state.isExpanded,
      divs: newDivs
    });
  },

  render: function () {
    return (
        <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          <button key={'abc'} type="button" onClick={this.toggleExpanded}>
          {this.state.expanded ? 'hide' : 'show'}
          </button>
          {this.state.divs}
        </ReactCSSTransitionGroup>
    )

  }

});


module.exports = TodoItem;