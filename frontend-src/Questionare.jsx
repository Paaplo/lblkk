import React, { Component } from 'react';

const topics = [
'Virkistävä paikka',
'Kaupungin tinkimätön helmi'
]
export default class Questionare extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	topic_id: 0,
	  	comment: ''
	  };
	}
	handleTopicChange(e){
		this.setState({ topic_id: e.target.value })
	}
	handleCommentChange(e){
		this.setState({ comment: e.target.value })
	}
	submitQueationare(e){
		this.props.submitQueationare(this.state);
	}
	render() {
		return (
			<div>
				{topics.map((topic, i) => {
					return (
						<div key={i}>
							<label>
								{topic}
								<input 
									type="radio"
									value={i}
									required
									rows="5"
									onChange={(e)=>this.handleTopicChange(e)}
								/>
							</label>
						</div>
					);
				})}
				<label>
					Comment
					<input
						type="textarea"
						onChange={(e)=> this.handleCommentChange(e)}
						className="question--comment_input"

					/>
				</label>
				<button
				 onClick={(e) => this.submitQueationare(e)}
				>Send
				</button>
			</div>
		);
	}
}
