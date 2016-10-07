
var React = require('react');

//creates a stateful component named 'List'
var Events = React.createClass({
       getInitialState: function() {
           return {
           };
       },
       componentDidMount: function() {
              console.log(this.props.event_arr); //How does this log the correct data,
       },
       render: function() {
       //log out the event data props
       var events = this.props.event_arr.map(function(elist) {
         return (
                <li key={elist.loc_id}>
                Name: {elist.loc_name}
                Lat: {elist.loc_lat}
                Lng: {elist.loc_lng}
                </li>
         );
       });

       return (
         <div className="events">
       {this.props.info}
           {events}
         </div>
       );

       }
});

module.exports = Events;
