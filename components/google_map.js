import React, { Component } from 'react';

export default class extends React.Component {

  //should it rerender if state updated
  shouldComponentUpdate() {
    return true;
  }

  componentDidMount () {
    this.map = new google.maps.Map(this.refs.map, {
      center: {lat: this.props.lat, lng: this.props.lng },
      zoom: 8
  });
}

  render () {
    return (
      <div id="map" ref="map" />

      );
  }
}
