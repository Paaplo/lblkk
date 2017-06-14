import React from 'react';
import $ from 'jquery';

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
export default class GMap extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {zoom: 14};
  }

  static propTypes() {
  	initialCenter: React.PropTypes.objectOf(React.PropTypes.number).isRequired
  }

  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    // 
    this.map = this.createMap();
    this.markers = this.props.questionares.map( (q, i) => {
      return this.createMarker(q, i);
    })
    //this.infoWindow = this.createInfoWindow()
  
    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created

  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }
  componentWillReceiveProps(nextProps) {
    this.markers.forEach((m) => {
      m.setMap(null);
    })        
    this.markers = [];
    this.markers = nextProps.questionares.forEach( (q, i) => {
      this.createMarker(q, i);
    })
  }
  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter(),
      styles: 
      [{'featureType':'landscape','stylers':[{'saturation':-100},{'lightness':65},{'visibility':'on'}]},{'featureType':'poi','stylers':[{'saturation':-100},{'lightness':51},{'visibility':'simplified'}]},{'featureType':'road.highway','stylers':[{'saturation':-100},{'visibility':'simplified'}]},{'featureType':'road.arterial','stylers':[{'saturation':-100},{'lightness':30},{'visibility':'on'}]},{'featureType':'road.local','stylers':[{'saturation':-100},{'lightness':40},{'visibility':'on'}]},{'featureType':'transit','stylers':[{'saturation':-100},{'visibility':'off'}]},{'featureType':'administrative.province','stylers':[{'visibility':'off'}]},{'featureType':'water','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':-25},{'saturation':-100}]},{'featureType':'water','elementType':'geometry','stylers':[{'hue':'#ffff00'},{'lightness':-25},{'saturation':-97}]}]
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions);
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng
    );
  }

  createMarker(q, i) {
    var infowindow = new google.maps.InfoWindow();
    const topic = topics.filter( (t, i) =>  i == q.topic_id)[0];
    const marker =  new google.maps.Marker({
      position: {lat: q.latitude ? parseFloat(q.latitude) : 0, lng:  q.longitude ? parseFloat(q.longitude) : 0},
      map: this.map,
    });
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent('<div id="iw-container"><div class="iw-title">'+topic+'</div><div class="iw-content">'+q.comment+'</div><div class="iw-bottom-gradient"></div></div>' );
        infowindow.open(this.map, marker);

      }
    })(marker, i));

google.maps.event.addListener(infowindow, 'domready', function() {

   // Reference to the DIV which receives the contents of the infowindow using jQuery
   var iwOuter = $('.gm-style-iw');

   /* The DIV we want to change is above the .gm-style-iw DIV.
    * So, we use jQuery and create a iwBackground variable,
    * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
    */
   var iwBackground = iwOuter.prev();

   // Remove the background shadow DIV
   iwBackground.children(':nth-child(2)').css({'display' : 'none'});

   // Remove the white background DIV
   iwBackground.children(':nth-child(4)').css({'display' : 'none'});
var iwCloseBtn = iwOuter.next();

// Apply the desired effect to the close button
iwCloseBtn.css({
  opacity: '1', // by default the close button has an opacity of 0.7
  right: '38px', top: '3px', // button repositioning
  border: '7px solid #48b5e9', // increasing button border and new color
  'border-radius': '13px', // circular effect
  'box-shadow': '0 0 5px #3990B9', // 3D effect to highlight the button
  'border': '0'
  });

// The API automatically applies 0.7 opacity to the button after the mouseout event.
// This function reverses this event to the desired value.
iwCloseBtn.mouseout(function(){
  $(this).css({opacity: '1'});
});

});
    return marker;
	}

  createInfoWindow() {
    let contentString = "<div class='InfoWindow'>I'm a Window that contains Info Yay</div>"
    return new google.maps.InfoWindow({
      map: this.map,
      anchor: this.marker,
      content: contentString
    })
  }
  handleMarkerChange(e){
    this.props.handleLocation({lat: e.latLng.lat(), lng: e.latLng.lng()})    
  }
  handleCenterChange(e) {
    this.marker.setPosition(this.map.getCenter());
    this.props.handleLocation({lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng()})
  }
  handleMapCenterChange(coords){
    this.map.setCenter(new google.maps.LatLng( coords.lat, coords.lng ) );
  }
  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
    })
  }
  setUserLocation(coords){
    this.map.setCenter(new google.maps.LatLng( coords.lat, coords.lng ) );   
  }


  render() {
    return (
    <div className="googlemap">
      <div className='googlemap--canvas' ref="mapCanvas" />
    </div>);
  }

}

var initialCenter = { lng: -90.1056957, lat: 29.9717272 }
