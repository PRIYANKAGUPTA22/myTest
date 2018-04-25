
import React from 'react';
import ReactDOM from 'react-dom';
import Geolocate from './geolocate.js';
import postMan from './postman.js';

class Location extends React.Component {


 constructor(props){
    super(props);
     this.state= { "cityLat": "",
     "cityLong":"",
     "countryLat":"",
     "countryLong":"",
     "currentLat":20.5937,
     "currentLong":78.9629
};
 }
 componentDidMount(){
    this.placeChangedSubscribed = postMan.subscribe("place_changed",function(data){
        console.log(data);
     });
     this.setState({currentLat:20.5937,currentLong:78.9629},()=>{
     });
    

 }
    getMyLocation(){
        var _this=this;
        if(!window.navigator.geolocation){
            document.getElementById("location").innerHTML = "Location Detection is not supported";
        }
        else{
            window.navigator.geolocation.getCurrentPosition(getNearByLocations,function(error){

            });
            
            }
            function getNearByLocations(position){
                
                    var lat = position.coords.latitude;
                    var long = position.coords.longitude;
                    var pyrmont = new google.maps.LatLng(lat,long);
                    var map = new google.maps.Map(document.getElementById('map-canvas'), 
                    {
                        center: pyrmont,
                        zoom: 15
                    });
                    var request = 
                    {
                        location: pyrmont,
                        radius:500
                    };
                    var  infowindow = new google.maps.InfoWindow();
                    var service = new google.maps.places.PlacesService(map);
                    service.nearbySearch(request, callback);
                    function callback(results,status){
                        console.log("Result",results);
                        
                    }
                }
    }
    
    render(){
        return(
            <section>
                 {/* <div id="map-canvas"> </div>
                <button onClick={this.getMyLocation.bind(this)}> Get my Location</button>
                <div id="location"></div> */}
                <div id ="search_main_container">
                <ul className= "centerWrapper">
                <li className="geolocate inlineBlock">
                      <Geolocate id ="city_location" currentLat={this.state.currentLat} currentLong={this.state.currentLong} otherId="main_input" className="inlineBlock"></Geolocate>
                </li>
               <li className="location_input inlineBlock">
               <div className="">
                    <input id="main_input" />
                </div>
                </li>
                <li>
                    <div id="search_button">Search</div>
                </li>
                
                </ul>
                </div>
            </section>
        )
    }
};


export default Location;
