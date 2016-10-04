import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from './google_map';

export default class App extends React.Component {
  constructor (props) {
      super(props);
  }

  render () {
    return (
      <div className="map" id="map">
        -Map goes here-
        <GoogleMap lat={-34.397} lng={150.644} />
      </div>
    );
  }
}
