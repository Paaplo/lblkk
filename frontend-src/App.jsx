import React from 'react';
import axios from 'axios';
import Startscreen from './Startscreen.jsx';
import Location from './Location.jsx';
import Question from './Question.jsx';
import Thanks from './Thanks.jsx';
import './styles/main.css'
export default class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
      screen: 'start',
      latitude: 0,
      longitude: 0
    };
	}
	switchScreen(newScreen){
		console.log(newScreen);
		this.setState({screen: newScreen});
	}
  submitQueationare(data){
    axios.post('https://kivatre.herokuapp.com/api', {
        ...data,
        longitude: this.state.longitude,
        latitude: this.state.latitude
      })
      .then((response) => {
        if(response.data && response.data.SUCCESS) {
          this.setState({screen: 'thanks'});
        }
      })
      .catch((error) => {
        console.log(error);
      });
      }
  render() {
    return (
     <div style={{textAlign: 'center'}}>
        <div className="board">
        {(() => {
            switch (this.state.screen) {
              case "location":
                  return <Location 
                  		switchScreen={this.switchScreen.bind(this)}
                  	/>;

              case "question":
                  return <Question
                    submitQueationare={this.submitQueationare.bind(this)}
                    />;
              case "thanks":
                  return <Thanks />;

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