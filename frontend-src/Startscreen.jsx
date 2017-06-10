import React from 'react';

export default class App extends React.Component {
  showQuestions (){
    this.props.switchScreen('location');
  }
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <h1>Comment on city location</h1>
        <p>Kiva kaupunki submits ...</p>
        <button
        	type="button"
        	className=""
        	onClick={ (e) => this.showQuestions(e)}
        >Start now</button>
      </div>);
  }
}