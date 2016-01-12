import React, {Component, PropTypes} from 'react';
var axios = require('axios');
import ReactDOM from 'react-dom';

export default function(){
   var obj = {
      searchTokens: 0,
      _buffer: {},
      isLoaded: function() {
         if (SERVER) {
            return false;
         }
         return typeof google !== 'undefined' && typeof google.maps !== 'undefined';
      },
      load: function () {
         return new Promise((resolve, reject)=> {
            if (SERVER) {
               reject(new Error('Does not work on server'));
            }
            else if (!obj.isLoaded()) {
               window.mapsCallback = function() {
                  delete window.mapsCallback;
                  resolve();
               };

               var script = document.createElement('script');
               script.type = 'text/javascript';
               script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapsCallback';
               document.head.appendChild(script);
            } else {
               reject(new Error('Already loaded'));
            }
         });
      },
      search: function(address = '') {
         return new Promise((resolve, reject)=>{
            if(!address){
               return reject('Search address is empty');
            }
            obj.searchTokens = obj.searchTokens + 1;

            setTimeout(() => {
               obj.searchTokens = obj.searchTokens - 1;
               if (obj.searchTokens === 0) {
                  var formatted = address.split(' ').join('+');
                  axios.get('/api/gmap/geocode/json?address=' + formatted + '&sensor=false')
                     //.withCredentials()
                     .then(data => {
                        data = data.data ? data.data : data;
                        const results = data && data.results && data.results.length > 0 ? data.results[0] : null;
                        if (results.geometry && results.geometry.location) {
                           const {geometry, formatted_address} = results;
                           resolve({
                              address: formatted_address,
                              lat: geometry.location.lat,
                              lng: geometry.location.lng
                           });
                           //this.attachMap({lat: geometry.location.lat, lng: geometry.location.lng});
                        }
                        else{
                           console.log(data);
                           reject(new Error('Rejected', data))
                        }
                     }).catch(reject);
               }
               else{
                  //reject(new Error('Rejected because new search was triggered.'))
               }
            }, 750);
         });
      },
      attachMap(ref, options = {lat: null, lng: null, info: null, address: 'Noch keine Adresse'}) {
         if (!obj.isLoaded()) {
            return;
         }
         ref = ReactDOM.findDOMNode(ref);

         const {lat, lng, info, address} = options;
         const center = new google.maps.LatLng(lat, lng);

         let {map, marker, infowindow} = obj._buffer;
         if (map) {
            map.panTo(center);
            marker.setPosition(center);
            infowindow.setContent(info || address);
            //this.state.infowindow.setPosition(mapOptions.center);
         }
         else {
            map = new google.maps.Map(ref, {center, zoom: 14});
            ref.classList.add('map');
            marker = new google.maps.Marker({position: center, title: 'Hi', map: map});
            infowindow = new google.maps.InfoWindow({position: center, title: 'Hi', map: map});
            infowindow.setContent(info || address);
            infowindow.open(map, marker);
            obj._buffer = {map: map, marker: marker, infowindow: infowindow};
         }
      }
   };
   return obj;
};
