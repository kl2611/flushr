var React = require('react');
var ReactDOM = require('react-dom');
var FilterActions = require('../../actions/filter_actions.js');
var Search =require('../nav/Search');

function _getCoordsObj(latLng) {
  return {
    lat: latLng.lat(),
    lng: latLng.lng()
  };
}

//var CENTER = {lat: 40.728, lng: -74.000}; //midtown somewhere
var CENTER = {lat: 40.8081, lng: -73.9621}; // Columbia University campus

var Map = React.createClass({
  _initializeMaps: function(centerLatLng) {
      this.currentCenter = centerLatLng;
      var mapEl = ReactDOM.findDOMNode(this.refs.map);

      if (centerLatLng) {
        var mapOptions = {
          center: this.centerLatLng,
          zoom: 15
        };
      } else {
        var mapOptions = {
          center: {lat: 40.728, lng: -74.000},
          zoom: 15
        }
      };

      this.map = new google.maps.Map(mapEl, mapOptions);
      this.registerListeners();
      this.markers = [];
  },

  componentDidMount: function() {
      this._initializeMaps(this.props.centerLatLng);

      if (this.props.spots) {
        this.props.spots.forEach(this.createMarkerFromSpot);
      };
    },

  componentWillUnmount: function(){
    this.markerListener.remove();
    console.log("map UNmounted");

  },

  componentDidUpdate: function (oldProps) {
    this._onChange();
  },

  componentWillReceiveProps: function(newProps) {
    var newCenter = newProps.centerLatLng;

    if (!(this.currentCenter === newCenter)) {
      this.map.setCenter(newCenter);
      this.currentCenter = newCenter;
    }
  },

  // _isSameCoord: function(coord1, coord2) {
  //   return (coord1.lat === coord2.lat && coord1.lng === coord2.lng);
  // },

  _onChange: function(){
    var spots = this.props.spots;
    var toAdd = [], toRemove = this.markers.slice(0);
    spots.forEach(function(spot, idx) {
      var idx = -1;

      for(var i = 0; i < toRemove.length; i++){
        if(toRemove[i].spotId == spot.id){
          idx = i;
          break;
        }
      }
      if(idx === -1){
        toAdd.push(spot);
      } else {
        toRemove.splice(idx, 1);
      }
    });
    toAdd.forEach(this.createMarkerFromSpot);
    toRemove.forEach(this.removeMarker);

    if (this.props.singleSpot) {
      this.map.setOptions({draggable: false, scrollable: false, zoom: 18});
      this.map.setCenter(this.centerSpotCoords());
    }
  },

  centerSpotCoords: function () {
    if (this.props.spots[0] && this.props.spots[0].lng) {
      var spot = this.props.spots[0];
      return { lat: spot.lat, lng: spot.lng };
    } else {
      return CENTER;
    }
  },

  registerListeners: function() {
    var that = this;
    google.maps.event.addListener(this.map, 'idle', function() {
      var bounds = that.map.getBounds();
      var northEast = _getCoordsObj(bounds.getNorthEast());
      var southWest = _getCoordsObj(bounds.getSouthWest());
      var bounds = {
        northEast: northEast,
        southWest: southWest
      };
      FilterActions.updateBounds(bounds);
    });
    google.maps.event.addListener(this.map, 'click', function(event) {
      var coords = {lat: event.latLng.lat(), lng: event.latLng.lng() };
      that.props.onMapClick(coords);
    });
  },

  createMarkerFromSpot: function (spot) {
    var that = this;
    var pos = new google.maps.LatLng(spot.lat, spot.lng);
    var marker = new google.maps.Marker({
      position: pos,
      map: this.map,
      spotId: spot.id
    });

    this.markerListener = marker.addListener('click', function () {
      that.props.onMarkerClick(spot);
    });
    this.markers.push(marker);
  },

  removeMarker: function(marker){
    for(var i = 0; i < this.markers.length; i++){
      if (this.markers[i].spotId === marker.spotId){
        this.markers[i].setMap(null);
        this.markers.splice(i, 1);
        break;
      }
    }
  },

  render: function() {
    return (
        <div className="map" ref="map" id="map" />
      );
  }
});

module.exports = Map;
