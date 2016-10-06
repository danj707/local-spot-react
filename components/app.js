import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from './google_map';

let loc = {
  lat: 32.5045256,
  lng: -96.80405820000001,
};

export default class App extends React.Component {
  constructor (props) {
      super(props);
  }
  render () {
    return (
      <div className="map" id="map">
        <GoogleMap lat={loc.lat} lng={loc.lng} markers={this.props.markers}/>
      </div>
    );
  }
}
