
var React = require('react');

//to be used later when generating google map
// var img = new Image();
// img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

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
