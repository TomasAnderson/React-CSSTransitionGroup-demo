var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var TodoList = React.createClass({

  getInitialState: function () {
    return {items: ['hello', 'world', 'click', 'on']};
  },

  handleAdd: function () {
    var newItems = this.state.items.concat([prompt('Enter some text')]);
    this.setState({items: newItems});
  },

  handleRemove: function (i) {
    var newItems = this.state.items.slice();
    newItems.splice(i, 1);
    this.setState({items: newItems});
  },

  render: function () {
    var items = this.state.items.map(function (item, i) {
      return (
        <div 
          key={item} 
          onClick={this.handleRemove.bind(this, i)} 
          className="item"
        >
          {item}
          <button> collapse </button>
        </div>
      );
    }.bind(this));
    return (
      <div>
        <button onClick={this.handleAdd}> Add Item </button>
        <ReactCSSTransitionGroup 
           transitionAppear={true} 
           transitionAppearTimeout={500}
           transitionName="example" 
           transitionEnterTimeout={500} 
           transitionLeaveTimeout={300} 
        >
          {items}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

});

var x = object-assign({}, React.ProtoTypes, {
  
})

React.render(
	<TodoList />,
	document.getElementById('app')
);