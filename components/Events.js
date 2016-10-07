
var React = require('react');
var router = require('react-router');
var Link = router.link;

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
              Rating: {elist.rating}
              </li>
         );
       });

       return (
       <div className="events">
              <ul className="list">
              <p>{this.props.info}</p>
              <p>{events}</p>
       </ul>
       </div>
       );

       }
});

module.exports = Events;
