var React = require('react/addons');
var ReactDOM = require('react-dom');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
var TodoBox = require('./todobox.react');


React.render(
  <TodoBox />,
  document.getElementById('app')
)