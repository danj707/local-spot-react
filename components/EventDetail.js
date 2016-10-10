var React = require('react');
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

var EventDetail = React.createClass ({
    componentDidMount: function() {
        console.log("Mounted!");
        console.log(this.props);
    },
    render: function() {
    return (
        <div>
        <p><strong>Name: {event.name}</strong></p>
        </div>
    );
    }
});

module.exports = EventDetail;
