var React = require('react');
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

var EventDetail = React.createClass ({
    componentDidMount: function() {
    },
    render: function() {
    return (
        <div>
        <strong>Name: {this.props.children}</strong>
        </div>
    );
    }
});

module.exports = EventDetail;
