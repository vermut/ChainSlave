import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {NavController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';
// import * as JitsiPlugin from 'cordova-plugin-jitsi/www/JitsiPlugin.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  latitude = undefined;
  longitude = undefined;

  constructor(platform: Platform, public navCtrl: NavController, private geolocation: Geolocation) {

    platform.ready().then(() => {
      console.log('Platform ready');

      // JitsiPlugin.loadURL("https://meet.jit.si/", "FoxySquirrelsJinxPainfully", (success) => {
      //   console.log(success);
      // });

      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Latitude: ' + position.coords.latitude + '\n' +
          'Longitude: ' + position.coords.longitude + '\n' +
          'Altitude: ' + position.coords.altitude + '\n' +
          'Accuracy: ' + position.coords.accuracy + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
          'Heading: ' + position.coords.heading + '\n' +
          'Speed: ' + position.coords.speed + '\n' +
          'Timestamp: ' + position.timestamp + '\n');
      }, (error) => {
        console.log('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
      }, {timeout: 5000, enableHighAccuracy: true});

      let watch = this.geolocation.watchPosition({timeout: 5000, enableHighAccuracy: true});
      watch.subscribe((position) => {
        if (!position.coords) {
          console.log("Empty position.coords?..");
          return;
        }

        const updatedLatitude = position.coords.latitude;
        const updatedLongitude = position.coords.longitude;

        if (updatedLatitude != this.latitude && updatedLongitude != this.longitude) {
          this.latitude = updatedLatitude;
          this.longitude = updatedLongitude;

          console.log('we are: ' + updatedLatitude + ", " + updatedLongitude);
        }
      }, (error) => {
        console.log('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
      });
    });
  }

}
