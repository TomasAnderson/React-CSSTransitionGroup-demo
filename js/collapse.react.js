'use strict'
var React = require('react');
var TransitionEvents = require('react/lib/ReactTransitionEvents');

var Collapse = React.createClass({

	propTypes: {
		defaultExpanded: React.PropTypes.bool,
		expanded: React.PropTypes.bool
	},

	getDefaultProps: function () {
		return {
			duration: 700,
		};
	},

	getInitialState: function() {
		var defaultExpanded = this.props.defaultExpanded != null?
			this.props.defaultExpanded :
				this.props.expanded != null ? this.props.expanded : false;
		return {
			expanded: defaultExpanded,
			collpasing: false 
		};
	},

	componentWillUpdate: function(nextProps, nextState) {
		var willExpanded = nextProps.expanded != null ? nextProps.expanded : nextState.expanded;
		
		//no change
		if (willExpanded === this._isExpanded()) {
			return ;
		}

		//toggle 
		var node = this._getCollapsibleDOMNode();
		var dimension = this._dimension();
		var value = '0';

		if (!willExpanded) {
			value = this._getCollapsibleDimensionValue();
		}

		node.style[dimension] = value + 'px';
	},

	componentDidUpdate(prevProps, prevState) {
		// check if expanded is being toggled, if so, set collapsing
		this._checkToggleCollapsing(prevProps, prevState);

		// check if collapsing was turned on; if so, start animation
		this._checkStartAnimation();	
	},	

	toggle: function () {
		this.setState({
			expanded: !this.isExpanded()
		});
	},

	hide: function () {
		if(this.isExpanded()) {
			this.setState({expanded: false});
		}
	},

	show: function () {
		if(!this.isExpanded()) {
			this.setState({expanded: true});
		}
	},

	render: function () {
		return (
      <div className={this._getClassName(this._getCollapsibleClassSet(this.props.className))} ref="container">
        {this.props.children}
      </div>
		);
	},

	_isExpanded() {
		return this.props.expanded != null? this.props.expanded : this.state.expanded;
	},

	_getCollapsibleDOMNode: function () {
		return React.findDOMNode(this.refs['container']);
	},

	_getCollapsibleDimensionValue: function () {
		return React.findDOMNode(this.refs['container']).scrollHeight;
	},

	_getClassName: function (classNames) {
		if (typeof classNames == 'object') {
			return Object.keys(classNames).filter(function (className) {
				return classNames[className];
			}).join(' ');
		} else {
			return Array.prototype.join.call(arguments, '');
		}
	},

	_dimension: function () {
		return 'height';
	},

	_checkToggleCollapsing: function (prevProps, prevState) {
		var wasExpanded = prevProps.expanded != null ? prevProps.expanded : prevState.expanded;
		var isExpanded = this._isExpanded();
		if (wasExpanded !== isExpanded) {
			if (wasExpanded) {
				this._handleCollapse();
			} else {
				this._handleExpand();
			}
		}
	},

	_handleExpand: function () {
		//TODO: handle expansion	
		// In the bootstrap implementation, it manually add and remove event handler. 
		// If we make use of CSSTransitionGroup, we have to wrap the divs somewhere and define the parameters.
		
		var node = this._getCollapsibleDOMNode();
		var dimension = this.dimension();

		var complete = function () {
			this._removeEndEventListener(node, complete);
			node.style[dimension] = '';
			this.setState({
				collapsing: false
			});
		};

		this._addEndEventListner(node, complete);

		this.setState({
      collapsing: true
    });  	
	},

	_handleCollapse: function () {
		//TODO: handle collapsing
		// In the bootstrap implementation, it manually add and remove event handler. 
		// If we make use of CSSTransitionGroup, we have to wrap the divs somewhere and define the parameters.
		var node = this._getCollapsibleDOMNode();

		var complete = function () {
			this._removeEndEventListener(node, complete);
			this.setState({
				collapsing: false
			});
		}.bind(this);

		this._addEndEventListner(node, complete);

		this.setState({
      collapsing: true
    });
	},


	_addEndEventListner: function (node, complete) {
		TransitionEvents.addEndEventListner(node, complete);	
	},

	_removeEndEventListener: function (node, complete) {
		TransitionEvents.removeEndEventListener(node, complete);
	},

	_checkStartAnimation: function () {
		if(!this.state.collapsing) {
			return ;
		}

		var node = this._getCollapsibleDOMNode();
		var dimension = this._dimension();
		var value = this._getCollapsibleDimensionValue();

		var result;
		if (this._isExpanded()) {
			result = value + 'px';
		} else {
			value = '0px';
		}
		node.style[dimension] = result;
	},

	_getCollapsibleClassSet: function (className) {
		var classes = {};

		if (typeof className === 'string') {
			className.split(' ').forEach(function (subClasses) {
				if (subClasses) {
					classes[subClasses] = true;
				};
			}.bind(this));
		}

		classes.collapsing = this.state.collapsing;
		classes.Collapse = !this.state.collapsing;
		classes.in = this._isExpanded() && !this.state.collapsing;
	
		return classes;
	}

});

module.exports = Collapse;
