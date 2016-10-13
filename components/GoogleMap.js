import React, { Component } from 'react';

export default class GoogleMap extends React.Component {

  //should it rerender if state updated? Yep.
  shouldComponentUpdate() {
    return true;
}

componentWillReceiveProps(nextProps) {
    //pan the map to the user's location
    this.map.panTo({ lat: this.props.lat, lng: this.props.lng });

  /*Handles the event_arr not being defined, no event data, i.e., nothing to label/map
  Generates the map markers for each item in the event_arr/marker data from Foursquare API
  */

    if(this.props.markers) {
      let mapPoints = this.props.markers;
        for(var i=0;i < mapPoints.length ; i++) {
            this.map.Marker = new google.maps.Marker({
                position: {lat: mapPoints[i].loc_lat, lng: mapPoints[i].loc_lng},
                map: this.map,
                title: mapPoints[i].loc_name + '-' + mapPoints[i].loc_address.formattedAddress[0] + ',' + mapPoints[i].loc_address.formattedAddress[1]
            });
        }
    }
}

//Displays the initial map with the user's lat/lng data from their geolocate
  componentDidMount () {
        this.map = new google.maps.Map(this.refs.map, {
          center: {lat: this.props.lat, lng: this.props.lng },
          zoom: this.props.zoom
    });
  }

  render () {
    return (
      <div id="map" ref="map" className="map">

      </div>
      );
  }
}
