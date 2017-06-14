import React, { Component } from 'react';

export default class Thanks extends Component {
	render() {
		return (
			<div className="info">
        		<h2>Thank you!</h2>
        		<p>Thank you, for submitting your comment! It has now been saved and should soon appear to the comment visualization map.</p>
        		<p className="textbutton" onClick={ () => this.props.switchScreen('start')}>
					<u>Start screen</u>
				</p>
      		</div>	
		);
	}
}
