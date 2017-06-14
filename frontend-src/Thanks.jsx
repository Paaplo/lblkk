import React, { Component } from 'react';
import GMap from './GoogleMapQ.jsx';

export default class Thanks extends Component {
	render() {
		return (
			<div className="info">
        		<h2>Thank you!</h2>
        		<div>
        			<p>Thank you, for submitting your comment! It has now been saved and should soon appear to the comment visualization map.</p>
        		</div>
				<div className="thanks--map">
					<GMap 
						initialCenter={this.props.location}
						handleLocation={this.props.handleLocation}
						userLocation={this.props.userLocation}
                   		questionares={this.props.questionares}
					/>
				</div>
				<div>
	        		<p className="backbutton" onClick={ () => this.props.switchScreen('start')}>
						<u>Start screen</u>
					</p>
				</div>
      		</div>	
		);
	}
}
