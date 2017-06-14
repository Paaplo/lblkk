import React from 'react';

export default class App extends React.Component {
  showQuestions (){
    this.props.switchScreen('location');
  }
  render() {
    return (
      <div>
        <meta content="width=device-width,initial-scale=1" name="viewport"/>
        <div className="info">
          <h2>Comment on city location</h2>
          <p>Kiva kaupunki submits help to build a map of recreational locations in your city and might help planning officers to take notice on places and things, that residents deem most important.</p>
          <p className="textbutton" onClick={ () => this.props.switchScreen('location')}>
            <u>Start now</u>
          </p>
      </div></div>);
  }
}