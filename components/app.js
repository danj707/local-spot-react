import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GoogleMap from './google_map';

// //initial location on component load, middle of the usa
// let loc = {
//   lat: 37.09024,
//   lng: -95.712891,
//   zoom: 3
// };

export default class App extends React.Component {
  constructor (props) {
      super(props);
  }

  componentWillReceiveProps (props) {
    this.setState({
      lat : this.props.lat,
      lng : this.props.lng
  });
}

  render () {
    console.log("Map Render with: " + this.props.lat, this.props.lng, this.props.zoom);
    return (
      <div className="map" id="map">
        <GoogleMap lat={this.props.lat} lng={this.props.lng} zoom={this.props.zoom}/>
      </div>
    );
  }
}
