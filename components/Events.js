
const loc_cal_link = "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20160919T220000Z/20160919T230000Z&text=Go+To+";

var React = require('react');
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

//creates a stateful component named 'List'
var Events = React.createClass({
       componentDidMount: function() {
              //var event_arr = this.props.event_arr ? this.props.event_arr : 'Nothing to display';
              console.log(this.props.event_arr);

       },
       render: function() {
              return (
                     <div className="events">
                    <p className="list_top">{this.props.info}</p>
                     <ul className="list">

                     {this.props.event_arr.map(elist => (
                            <li key={elist.loc_id}>
                            <div>
                                   <img className="loc_img" src={elist.loc_img} alt={elist.loc_name}></img>
                            </div>
                            <p className="eventname">
                                   <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                   <a href={elist.link} target="blank">{elist.loc_name}</a>  - {elist.rating}
                            </p>



                            <p className="eventtext">
                                   Location tips: {elist.loc_tips}
                            </p>

                            <p className="break">
                                   <i className="fa fa-calendar-check-o" aria-hidden="true"></i>
                                   <a href={loc_cal_link + elist.loc_name + '&location=' + elist.loc_address.formattedAddress[0] + ',' + elist.loc_address.formattedAddress[1]} target='blank'>Add to your Google Calendar</a>
                            </p>

                            </li>
                     ))}
              </ul>
              </div>
       );

       }
});



module.exports = Events;
