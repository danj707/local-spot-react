
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Events from './Events';
import GoogleMap from './GoogleMap';

import { Router } from 'react-router';
import { push } from 'react-router-redux';
import { hashHistory } from 'react-router';

/*
-Layout Component (parent) with two children components:

      -google_map.js (child) - Google Map display - handles markers, etc

      -Events.js (child) - Displays list of Events by type

**Procedure should be:
1 = run geolocation, get lat/lng of user on SPA load
2 = take textbox entry for user's name, pulldown selection for type of item to explore (food, drinks, arts, etc)
3 = on button click, use lat/lng data to sent API request to foursquare
4 = transition Map to user's lat/long with colored marker
5 = update Events and Map components simultaneously, which rerenders components and displays new data in Events, Map.  Displays labels on map for events returned
*/

/* TODO additions/improvements list
- Better error handling if you can't get geolocation data, right now, only an alert window
- Improve react router and path handling, display additional data in <eventdetail> window
*/

//Some Global Vars to store data
var event_obj = {};
var event_arr = [];
var lat;
var lng;

function pushDataEvents (element, index, array) {
   if(element.venue.name) {
      if(element.venue.location.lat) {
         if(element.venue.location.lng) {
            let loc_id = element.venue.id;
            let rating = element.venue.rating;
            let link = "https://www.google.com/#q=";
            let loc_img = '';
            let currency = '';
            if(element.venue.url) {
               link = element.venue.url;
            } else {
               link += element.venue.name;
            }
            if(element.venue.photos.groups[0].items[0].prefix) {
               loc_img = element.venue.photos.groups[0].items[0].prefix + "width60" + element.venue.photos.groups[0].items[0].suffix;
            }
            let loc_address = element.venue.location;
            let loc_name = element.venue.name;
            let loc_lat = element.venue.location.lat;
            let loc_lng = element.venue.location.lng;
            var loc_tips = element.tips[0].text ? element.tips[0].text : 'No Tips';

            /*update the array object to hold all this event data, push it all in, then pass to <Event>*/
            event_arr.push({loc_id, rating, link, loc_name, loc_lat, loc_lng, loc_tips, loc_img, loc_address});
         }
      } else {
         //handle errors
         return ["Sorry, not enough results, try another search"];
      }
   }
   return event_arr;
}

//creates a stateful component named 'Layout'
var Layout = React.createClass({
    /*Gets the initial state, sets some default state data, hardcoded middle of US for starting lat and long by default, will pan to user's location after geolocate*/
    getInitialState: function () {
        return {
            data: [],
            welcome: 'Welcome to your LocalSpot!',
            name: '',
            hide: false,
            info: "No local events to display yet.",
            event_arr: event_arr,
            lat: 37.09024,
            lng: -95.712891,
            zoom: 9,
            type: ["Food","Drinks","Coffee","Arts","Shops","Outdoors","Trending","topPicks","Sights"],
            chosen:''
        };
    },
    //handles changing the name when user enters it
    onAddInputChanged: function(event) {
         this.setState({
            name: event.target.value,
            });
    },
    //handles changing the name when user enters it
    onAddSelectChanged: function(event) {
         this.setState({
            chosen: this.refs.options.value
            });
    },
    /*button clicking callback function, contains all the logic for updating the state with user's name, hides the welcome text */
    onAddSubmit: function(event) {
         var name = this.state.name.trim();
         event.preventDefault();
            this.setState({
                welcome: "Welcome " + name + ". Here's your Top 20 Local Spots!",
                hide: !this.state.hide,
                lat: lat,
                lng: lng,
                info: "Loading ...please wait",
                chosen: this.refs.options.value
            });
         this.getInfo(lat,lng,this.state.chosen);
    },
   componentDidMount: function() {
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
      //error handling
      function error() {
         alert("Unable to retrieve your location. Please try again, or accept the request to find your current location.");
      };
   },
   getInfo: function(lat,lng,chosen) {
      /*api call to foursquare with properly formatted URL, confirms returns valid data*/
        $.ajax({
            url: "https://api.foursquare.com/v2/venues/explore?ll=" + lat + "," + lng + "&radius=100000&limit=20&section=" +  chosen + "&venuePhotos=1&client_id=NBGERNGLPZAJIGOXDSD41F5Y3SU2STJ513W5ONWORWU1ISRK&client_secret=EGMKKKZ2ZCJN53UUDDBXXQYCOLL1YISUP1M35XVMDIV2ZXD3&v=20161003",
            dataType: 'json',
            cache: false,
            success: function(data) {
               console.log(data);
               //console.log(chosen);
               data.response.groups[0].items.forEach(pushDataEvents);
               let text = "Your Top 20 Local " + chosen + " Spots";
               this.setState({info: text, lat:lat,lng:lng});
            }.bind(this)
        });

   },
    render: function () {
        return (
           <div className="container">

           <h1 className="welcome transparency">{this.state.welcome}</h1>
            <div className={'hide-' + this.state.hide}>
               <div className="transparency">
            <p className="intro">LocalSpot - the place for fun, local events, from arts and crafts to food and drinks.</p>
            <ul className="listtext">
            <li><p className="helper">Enter your name below, and 'allow' the browser to find your current location.</p></li>
            <li><p className="helper">Choose a category of events to search locally, and we'll map them for you.</p></li>
            </ul>

                <form className="form" onSubmit={this.onAddSubmit}>
                <input type="text" value={this.state.name} required placeholder="your name" onChange={this.onAddInputChanged} />

                <select id="dropdown" ref="options" onChange={this.onAddSelectChanged}>
                  <option value={this.state.type[0]}>{this.state.type[0]}</option>
                  <option value={this.state.type[1]}>{this.state.type[1]}</option>
                  <option value={this.state.type[2]}>{this.state.type[2]}</option>
                  <option value={this.state.type[3]}>{this.state.type[3]}</option>
                  <option value={this.state.type[4]}>{this.state.type[4]}</option>
                  <option value={this.state.type[5]}>{this.state.type[5]}</option>
                  <option value={this.state.type[6]}>{this.state.type[6]}</option>
                </select>

                <input type="submit" value="Go" />

                </form>
               </div>
             </div>

            <div className="childWrapper">
            <GoogleMap lat={this.state.lat} lng={this.state.lng} zoom={this.state.zoom} markers={event_arr}/>


            <Events event_arr={event_arr} className="events" info={this.state.info} type={this.state.chosen} />
            </div>

            <div>
              {this.props.children}
            </div>

         </div>
        );
    }
});

module.exports = Layout;
