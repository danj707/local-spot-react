
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var Events = require('./Events');

import GoogleMap from './google_map';
import App from './app';

import { Router } from 'react-router';
import { push } from 'react-router-redux';
import { hashHistory } from 'react-router';

//to be used later in google calendar stuff
// var calendar_add = "https://calendar.google.com/calendar/render?action=TEMPLATE&location=http://www.thinkful.com/hangout/mbanea&trp=false&dates=20160919T220000Z/20160919T230000Z&text=Thinkful+mentor+session&sf=true&output=xml#eventpage_6";

//creates a stateful component named 'Layout'
var Layout = React.createClass({
    //Gets the initial state
    getInitialState: function () {
        return {
            data: [],
            welcome: 'Welcome to LocalSpot!',
            name: '',
            hide:false,
            lat:'',
            lng:''
        };
    },
    //handles changing the name when user enters it
    onAddInputChanged: function(event) {
        this.setState({
            name: event.target.value
            });
    },
    /*button clicking callback function, contains all the logic for updating the state with user's name, hides the welcome text */
    onAddSubmit: function(event) {
        var name = this.state.name.trim();
        event.preventDefault();
            this.setState({
                welcome: "Welcome " + name + ". Here's your local events!",
                hide: !this.state.hide,
            });
            //hashHistory.push('/events');
    },
    componentDidMount: function() {

      //geolocate function definitions for success and failure
      function success(position) {
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        //----------->>>>>>>>HHHEEERREEEEEEEE
        this.setState({
            lat: latitude,
            lng: longitude,
        });
        console.log("Latitude is " + latitude + " Longitude is " + longitude);

        var event_url = "https://api.foursquare.com/v2/venues/explore?ll=" + latitude + "," + longitude + "&radius=100000&limit=10&section=food&client_id=NBGERNGLPZAJIGOXDSD41F5Y3SU2STJ513W5ONWORWU1ISRK&client_secret=EGMKKKZ2ZCJN53UUDDBXXQYCOLL1YISUP1M35XVMDIV2ZXD3&v=20161003";

        console.log(event_url);

        //api call to foursquare with properly formatted URL, confirms returns valid data
        $.ajax({
            url: event_url,
            dataType: 'json',
            cache: false,
            success: function(data) {
               console.log(data.response.groups[0].items); //FAILURE HERE SOMEHOW, but console.log shows valid data
               //FAILING HERE ------------- <<<<<<<<<<<<<<<<<<<<
//              this.setState(
//                 {data: data.response.groups[0].items}
//               );
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(event_url, status, err.toString());
            }.bind(this)
        });

      };

      //error handling, todo improvements
      function error() {
        alert("Unable to retrieve your location");
      };

      //if component did mount, run geolocate, success callback should be firing off async .ajax call
      navigator.geolocation.getCurrentPosition(success, error);
   },

    render: function () {

        return (

           <div className="container">

           <h2>{this.state.welcome}</h2>
            <div className={'hide-' + this.state.hide}>
            <p>LocalSpot - the place for fun, local events.  Enter your name below, and 'allow' the browser
            to find your current location.  We'll pick a list of cool events near you and map them for you.</p>

             <form onSubmit={this.onAddSubmit}>
             <input type="text" value={this.state.name} placeholder="your name" onChange={this.onAddInputChanged} />

             <input type="submit" value="Go" />

             </form>
             </div>

            <App className="map" id="map" lat={this.state.lat} lng={this.state.lng} />

            <Events event_data={this.state.data} className="events" />

            </div>
        );
    }
});

module.exports = Layout;
