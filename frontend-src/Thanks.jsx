import React, { Component } from 'react';
import GMap from './GoogleMapQ.jsx';

export default class Thanks extends Component {
	render() {
		return (
			<div>
				<meta content="width=device-width,initial-scale=1" name="viewport"/>
			<div className="info">
        		<h2>Thank you!</h2>
        		<div>
        			<p>Thank you, for submitting your comment! It has now been saved, visualization map will be compiled and published in a later time.</p>
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
			</div>
		);
	}
}
