var React = require('react');

var Collapse = React.createClass({

	getDefaultProps: function () {
		return {
			duration: 700
		};
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

	getCollapsibleDOMNode: function () {
		return React.findDOMNode(this.refs['container']);
		//this.refs['container'] is essentially the same as this.refs("container")
		//but where the hell is container? 
		//well maybe the assumption is all the containers are collpasible
	},

	getCollapsibleDimensionValue: function () {
		return React.findDOMNode(this.refs['container']).scrollHeight;
	},

	getClassName: function (classNames) {
		if (typeof classNames == 'object') {
			return Object.keys(classNames).filter(function (className) {
				return classNames[className];
			}).join(' ');
		} else {
			return Array.prototype.join.call(arguments, '');
		}
	},

	render: function () {
		return (
			<div className={this.getClassName(this.getCollapsibleClassSet(this.props.className))} ref="container">
				{this.props.children}
			</div>
		);
	}

});


// example:

// <Collapse className="wm-cardgroup" defaultExpanded={true} ref='self' >
// 	{this.renderMainCard()}
// 	{this.renderOtherCard()}
// </Collapse>