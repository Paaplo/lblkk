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
      location: {lat: 61.4984934, lng: 23.7693295},
      userLocation: {lat: 61.4984934, lng: 23.7693295},
      questionares: []
    };
    this.getLocation();
    this.getQuestionares();
	}
	switchScreen(newScreen){
		this.setState({screen: newScreen});
	}
	getQuestionares(){
  	axios.get('https://kivatre.herokuapp.com/api')
      .then((response) => {
        if(response.data && response.data) {
        	this.setState({questionares: response.data});
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
	}
  submitQueationare(data){
    axios.post('https://kivatre.herokuapp.com/api', {
        ...data,
        longitude: this.state.location.lng,
        latitude: this.state.location.lat
      })
      .then((response) => {
        if(response.data && response.data.SUCCESS) {
          this.setState({screen: 'thanks'});
          this.getQuestionares();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleLocation(location){
  	console.log(location);
		  this.setState({location: {lat: location.lat, lng: location.lng}});	
  }
	getLocation(){
		var options = {
		  enableHighAccuracy: true,
		  timeout: 5000,
		  maximumAge: 0
		};

		function success(pos) {
		  var crd = pos.coords;
		  this.setState({
		  	location: {lat: crd.latitude, lng: crd.longitude},
		    userLocation: {lat: crd.latitude, lng: crd.longitude}
		  })
		  console.log('Your current position is:');
		  console.log(`Latitude : ${crd.latitude}`);
		  console.log(`Longitude: ${crd.longitude}`);
		  console.log(`More or less ${crd.accuracy} meters.`);
		};

		function error(err) {
		  console.warn(`ERROR(${err.code}): ${err.message}`);
		};

		navigator.geolocation.getCurrentPosition(success.bind(this), error, options);
	}
  render() {
    return (
     <div>
        <div className="board">
        {(() => {
            switch (this.state.screen) {
              case "location":
                  return <Location 
                  		switchScreen={this.switchScreen.bind(this)}
                  		location={this.state.location}
                  		handleLocation={this.handleLocation.bind(this)}
                  		userLocation={this.state.userLocation}
                  	/>;

              case "question":
                  return <Question
                    submitQueationare={this.submitQueationare.bind(this)}
                    switchScreen={this.switchScreen.bind(this)}
                    />;
              case "thanks":
                  return <Thanks 
                    switchScreen={this.switchScreen.bind(this)}
                  	location={this.state.userLocation}
                    questionares={this.state.questionares}
                  />;

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