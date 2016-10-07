
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var Events = require('./Events');

import GoogleMap from './google_map';
import App from './app';

import { Router } from 'react-router';
import { push } from 'react-router-redux';
import { hashHistory } from 'react-router';


var event_obj = {};
var event_arr = [];
var lat;
var lng;

function pushDataEvents (element, index, array) {
   if(element.venue.name) {
      if(element.venue.location.labeledLatLngs[0].lat) {
         if(element.venue.location.labeledLatLngs[0].lng) {
            let loc_id = element.venue.id;
            let loc_name = element.venue.name;
            let loc_lat = element.venue.location.labeledLatLngs[0].lat;
            let loc_lng = element.venue.location.labeledLatLngs[0].lng;
            event_arr.push({loc_id,loc_name, loc_lat, loc_lng });
            //create and object and array to hold all this event data, push it all in, then pass to <Event>

         }
      }
   }
   return event_arr;
}

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
            info: "No Event data, yet.",
            lat: 37.09024,
            lng: -95.712891,
            zoom: 8
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
                welcome: "Welcome " + name + ". Here's your Top, local restaurants!",
                hide: !this.state.hide,
                lat: lat,
                lng: lng,
                info: "Loading your local events....please wait"
            });
            //hashHistory.push('/events');
         this.getInfo(lat,lng);
    },
   componentDidMount: function() {
      /* Procedure should be:
      1 = run geolocation, get lat/lng of user
      2 = use lat/lng data to sent API request to foursquare
      3 = update state, which rerenders render function
      */
      this.getGeolocate();
   },
   getGeolocate: function() {
      //handles the geolocation
      navigator.geolocation.getCurrentPosition(success, error);

      function success(position) {
         lat = position.coords.latitude;
         lng = position.coords.longitude;
         console.log("Your current Lat and Lng is: " + lat + ", " + lng);
      }
      //error handling, todo improvements
      function error() {
         alert("Unable to retrieve your location");
      };
   },
   getInfo: function(lat,lng) {
      /*api call to foursquare with properly formatted URL, confirms returns valid data
      This is an async call, gets fired off at same time geolocate does, so the lat/lng haven't returned yet
      how to fix this?*/
        $.ajax({
            url: "https://api.foursquare.com/v2/venues/explore?ll=" + lat + "," + lng + "&radius=100000&limit=10&section=food&client_id=NBGERNGLPZAJIGOXDSD41F5Y3SU2STJ513W5ONWORWU1ISRK&client_secret=EGMKKKZ2ZCJN53UUDDBXXQYCOLL1YISUP1M35XVMDIV2ZXD3&v=20161003",
            dataType: 'json',
            cache: false,
            success: function(data) {
               console.log("Response object from FourSquare API call for your current location is:");
               console.log(data.response.groups[0].items);
               data.response.groups[0].items.forEach(pushDataEvents);
               this.setState({info: "Your Top 10 Restaurants", lat:lat,lng:lng});
            }.bind(this)
        });

   },
    render: function () {
      console.log("Render Call with: " + this.state.lat, this.state.lng);
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

            <App lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} markers={event_arr} />
            <Events event_arr={event_arr} className="events" info={this.state.info} />
            </div>
        );
    }
});

module.exports = Layout;
