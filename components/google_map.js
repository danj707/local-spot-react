import React, { Component } from 'react';

export default class extends React.Component {

  //should it rerender if state updated
  shouldComponentUpdate() {
    return true;
}

componentWillReceiveProps(nextProps) {
        this.setState({
          lat: nextProps.lat,
          lng: nextProps.lng,
          event_arr : nextProps.event_arr
      });
      //console.log(this.props.markers);
      //console.log(this.props);


  //pan the map to new location
  this.map.panTo({ lat: this.props.lat, lng: this.props.lng });

  //handles the event_arr not being defined, no event data, i.e., nothing to label/map

  if(this.props.markers) {
    let mapPoints = this.props.markers;
      for(var i=0;i < mapPoints.length ; i++) {
          this.map.Marker = new google.maps.Marker({
              position: {lat: mapPoints[i].loc_lat, lng: mapPoints[i].loc_lng},
              map: this.map,
              title: mapPoints[i].loc_name
        });
      }
  }
}

  componentDidMount () {
    //only loads once
    //console.log(this.props.markers);
    //console.log(this.props);

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
