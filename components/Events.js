
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
       componentDidMount: function() {
              console.log(this.props.event_arr); //How does this log the correct data,
              console.log(this.props.event_arr[0]); //And this logs undefined???
              for (var i = 0; i < this.props.event_arr.length; i++) {
                     console.log(foo[i].loc_name);
              }
       },
       render: function() {
       //log out the event data props
       // var events = this.props.event_arr.map(function(elist) {
       //   return (
       //          <li key={elist.loc_name}>
       //          Name: {elist.loc_name}
       //          Lat: {elist.loc_lat}
       //          Long: {elist.loc_lng}
       //          </li>
       //   );
       // });

       return (
         <div className="events">
         Your Local Events
           {/* {events} */}
         </div>
       );

       }
});

module.exports = Events;
