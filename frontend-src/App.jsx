import React from 'react';
import Startscreen from './Startscreen.jsx';
import Location from './Location.jsx';

export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {screen: 'start'};
	}
	switchScreen(newScreen){
		console.log(newScreen);
		this.setState({screen: newScreen});
	}
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <div className="board">
        {(() => {
            switch (this.state.screen) {
              case "location":
                  return <Location 
                  		switchScreen={this.switchScreen}
                  	/>;

              case "high-scores":
                  return <Startscreen />;

              case "start":
              default:
                  return <Startscreen 
                  		switchScreen={this.switchScreen.bind(this)}
                  />;
            }
          })()
        }
        </div>
    </div>);
  }
}