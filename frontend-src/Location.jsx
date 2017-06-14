import React, { Component } from 'react';
import GMap from './GoogleMap.jsx';

export default class Location extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {location: {lat: 61.4984934, lng:23.7693295}};
	  this.getLocation();
	}
	getLocation(){
		var options = {
		  enableHighAccuracy: true,
		  timeout: 5000,
		  maximumAge: 0
		};

		function success(pos) {
		  var crd = pos.coords;
		  this.setState({location: {lat: crd.latitude, lng: crd.longitude}})
		  console.log('Your current position is:');
		  console.log(`Latitude : ${crd.latitude}`);
		  console.log(`Longitude: ${crd.longitude}`);
		  console.log(`More or less ${crd.accuracy} meters.`);
		};

		function error(err) {
		  console.warn(`ERROR(${err.code}): ${err.message}`);
		};

		navigator.geolocation.getCurrentPosition(success.bind(this), error, options);
	}
	render() {
		return (
			<div>
				<meta content="width=device-width,initial-scale=1" name="viewport"/>
      	<div className="layer">
					<div className="progress">&#8212; &#8212; &#8212;</div>
					<div className="info">
						<h1>Location</h1>
						<p>Here's the location we have for you. If you want to change it drag the map with two fingers and tap to select.</p>
					</div>
					<div className="tasklayer">
						<GMap 
							initialCenter={this.state.location}
						/>
					</div>
				</div>
				<div className="lowerlayer">
					<button className="first--next--button" onClick={ () => this.props.switchScreen('question')}>
					Next step &#10142;
					</button>
				</div>
			</div>
		);
	}
}
