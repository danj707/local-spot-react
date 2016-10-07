import React, { Component } from 'react';

export default class extends React.Component {

  //should it rerender if state updated
  shouldComponentUpdate() {
    return true;
  }

  componentDidMount () {
    console.log(this.props);
        this.map = new google.maps.Map(this.refs.map, {
          center: {lat: this.props.lat, lng: this.props.lng },
          zoom: this.props.zoom
    });
  }

  render () {
    return (
      <div id="map" ref="map" />

      );
  }
}
