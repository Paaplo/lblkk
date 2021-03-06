import React from 'react';

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
    this.map = this.createMap()
    this.marker = this.createMarker()
    //this.infoWindow = this.createInfoWindow()
  
    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange())
    google.maps.event.addListener(this.marker,'drag', (e) => this.handleMarkerChange(e))

    google.maps.event.addListener(this.map, 'center_changed', (e)=> this.handleCenterChange(e))

  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.userLocation){
    }
  }
  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter(),
      styles: 
      [{'featureType':'landscape','stylers':[{'saturation':-100},{'lightness':65},{'visibility':'on'}]},{'featureType':'poi','stylers':[{'saturation':-100},{'lightness':51},{'visibility':'simplified'}]},{'featureType':'road.highway','stylers':[{'saturation':-100},{'visibility':'simplified'}]},{'featureType':'road.arterial','stylers':[{'saturation':-100},{'lightness':30},{'visibility':'on'}]},{'featureType':'road.local','stylers':[{'saturation':-100},{'lightness':40},{'visibility':'on'}]},{'featureType':'transit','stylers':[{'saturation':-100},{'visibility':'off'}]},{'featureType':'administrative.province','stylers':[{'visibility':'off'}]},{'featureType':'water','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':-25},{'saturation':-100}]},{'featureType':'water','elementType':'geometry','stylers':[{'hue':'#ffff00'},{'lightness':-25},{'saturation':-97}]}]
    }
    return new google.maps.Map(this.refs.mapCanvas, mapOptions)
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.initialCenter.lat,
      this.props.initialCenter.lng
    )
  }

  createMarker() {
    return new google.maps.Marker({
      position: this.mapCenter(),
      map: this.map,
      draggable:true,
    })
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
