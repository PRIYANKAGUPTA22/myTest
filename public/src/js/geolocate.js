
import React from 'react';
import ReactDOM from 'react-dom';
import postMan from './postman.js';

class Geolocate extends React.Component {


 constructor(props){
    super(props);
    this.state={'currentLat': this.props.currentLat,
    'currentLong':this.props.currentLong};
    this.geolocate = this.geolocate.bind(this);
 }
 componentDidMount(){
     var _this = this;

    var scriptElement = document.getElementById("scriptSection");
    var scriptTag= document.createElement("script");
    window.initAutocomplete = function() {
       _this.autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById(_this.props.id)),
            {types: ['geocode']});
    };
    // scriptTag.setAttribute('src',"https://maps.googleapis.com/maps/api/js?key=AIzaSyD_LF7qNfJ-u816W79jkL2aWCi5BGl81mw&libraries=places&callback=initAutocomplete");
    scriptTag.setAttribute('src',"https://maps.googleapis.com/maps/api/js?key=AIzaSyD_LF7qNfJ-u816W79jkL2aWCi5BGl81mw&libraries=places");
    scriptTag.setAttribute('type',"text/javascript");
    scriptTag.onload = function(){
        window.initAutocomplete();
        _this.geolocate();
    }
    scriptElement.appendChild(scriptTag);
 }
geolocate() {
       var _this=  this;
      var geolocation = {
            lat: this.state.currentLat,
            lng: this.state.currentLong
        };
    var circle = new google.maps.Circle({
        center: geolocation,
        radius: 500
    });
    this.autocomplete.setBounds(circle.getBounds());
    this.autocomplete.addListener('place_changed',function(){
        console.log("place changed");
        var data = {lat:_this.autocomplete.getPlace().geometry.location.lat(),
            lng:_this.autocomplete.getPlace().geometry.location.lng()};
        // postMan.publish("geolocate_place_changed",data);
        _this.mainLocationAutoComplete =  new google.maps.places.Autocomplete(
            (document.getElementById(_this.props.otherId)),
            {types: ['geocode']});
           var circle =new google.maps.Circle({
                center:data,
                radius:500
            });
        _this.mainLocationAutoComplete.setBounds(circle.getBounds());
       
    });

}
render(){
       
        return(
            <section>
                <div class="">
                    <input id = {this.props.id} type="text" placeholder='Enter City Name'/>

                </div>
                <div id="scriptSection"></div>
            
            </section>
        )
    }
};


export default Geolocate;
