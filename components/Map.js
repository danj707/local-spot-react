
var React = require('react');

//creates a stateful component named 'List'
var Map = React.createClass({

    render: function (){

        return (
            <div className="map">

            <img src="google-maps-sample.png"></img>
            </div>

        );
    }
});

module.exports = Map;
