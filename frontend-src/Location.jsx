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
			<div>Loc
				<button
					className="location--button"
        	onClick={ () => this.props.switchScreen('question')}
				>
					next
				</button>
				<GMap 
				  initialCenter={this.state.location}
				/>
			</div>
		);
	}
}
