import React, { Component } from 'react';

const topics = [
'Refreshing place',
'Great place for encounters and city events',
'Unquestionable jewel of the city',
'My development idea on this site',
'Accessibility problem',
'Difficult to walk on foot',
'Unsafe place',
'Noisy place'
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
				<meta content="width=device-width,initial-scale=1" name="viewport"/>
				{topics.map((topic, i) => {
					return (
						<div key={i}>
							<label className="question--radio--label">
								<input 
									type="radio"
									value={i}
									required
									rows="5"
									name="topic"
									onChange={(e)=>this.handleTopicChange(e)}
								/>
								{topic}
							</label>
						</div>
					);
				})}
				<label className="comment--label">
					Comment
					<textarea
						type="textarea"
						onChange={(e)=> this.handleCommentChange(e)}
						className="question--comment_input"

					/>
				</label>
				<button className="second--send--button send--button"
				 onClick={(e) => this.submitQueationare(e)}
				>Send &#10003;
				</button>
			</div>
		);
	}
}
