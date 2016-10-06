import React, { Component } from 'react';

export default class extends React.Component {

  //should it rerender if state updated
  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps() {
    this.map.Marker({position: {lat: 32.5045256, lng: -96.80405820000001 }, map: map, title: 'Hello World!'});
  }

  componentDidMount () {
    console.log(this.props);
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
