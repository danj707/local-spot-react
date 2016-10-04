
var React = require('react');

//creates a stateful component named 'List'
var Events = React.createClass({
       getInitialState: function() {
           return {
               welcome: 'No event data loaded yet',
               name: '',
               hide:false
           };
       },
       render: function() {
       //log out the event data props
       console.log(this.props.event_data);
       var events = this.props.event_data.map(function(elist) {
         return (
                <li key={elist.venue.id}>
                Name: {elist.venue.name}
                </li>
         );
       });
       return (
         <div className="events">
           {events}
         </div>
       );

}
});

module.exports = Events;
