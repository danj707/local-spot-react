/*
Google calendarhttps://calendar.google.com/calendar/render?action=TEMPLATE&dates=20160919T220000Z/20160919T230000Z&text=Test+calendar
*/

var React = require('react');
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

//creates a stateful component named 'List'
var Events = React.createClass({
       componentDidMount: function() {
              console.log(this.props.event_arr);
              //future info
       },
       render: function() {

              return (
                     <div className="events">
                     <ul className="list">
                     <p className="list_top">{this.props.info}</p>
                     {this.props.event_arr.map(elist => (
                            <li key={elist.loc_id}>
                            <p><i className="fa fa-arrow-right" aria-hidden="true"></i> <Link className="href" to={'/events/' + elist.loc_id}>{elist.loc_name}</Link> </p>
                            <p>User Rating: {elist.rating}</p>
                            <p><a href={elist.link} target="blank">Visit on web <i className="fa fa-external-link" aria-hidden="true"></i></a></p>
                            Location tips: {elist.loc_tips}
                            <hr></hr>
                            </li>
                     ))}
              </ul>
              </div>
       );

       }
});



module.exports = Events;
