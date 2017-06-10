import React, { Component } from 'react';
import Questionare from './Questionare.jsx';

export default class Question extends Component {
	render() {
		return (
			<div>
				<h2>Topic</h2>
				<Questionare 
					submitQueationare={(data) => this.props.submitQueationare(data)}
				/>
			</div>
		);
	}
}
