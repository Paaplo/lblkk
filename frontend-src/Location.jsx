import React, { Component } from 'react';
import GMap from './GoogleMap.jsx';

export default class Location extends Component {
	constructor(props) {
	  super(props);
	
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
							initialCenter={this.props.location}
							handleLocation={this.props.handleLocation}
							userLocation={this.props.userLocation}
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
