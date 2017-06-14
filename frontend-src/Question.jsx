import React, { Component } from 'react';
import Questionare from './Questionare.jsx';

export default class Question extends Component {
	render() {
		return (
			<div>
				<meta content="width=device-width,initial-scale=1" name="viewport"/>
				<div className="layer">
					<div className="progress">&#8212; <b>&#8212;</b></div>
					<div className="info">
						<h1>Topic</h1>
						<p>What would you like to comment about?</p>
						<p className="textbutton" onClick={ () => this.props.switchScreen('location')}><u>Go back</u></p>
					</div>
					<div className="tasklayer">
						<Questionare 
							submitQueationare={(data) => this.props.submitQueationare(data)}
						/>
					</div>
				</div>
				<div className="lowerlayer">
					<button className="second--next--button" onClick={ () => this.props.switchScreen('comment')}>
					Next step &#10142;
					</button>
					<button className="second--back--button" onClick={ () => this.props.switchScreen('location')}>
					&#10229;
					</button>
				</div>
			</div>
		);
	}
}
