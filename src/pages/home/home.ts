import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

declare var jitsiplugin: any;
declare var navigator: any;
declare var cordova: any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private inCall: boolean = false;
  private geoPosition: string = 'Update geo position';

  constructor(public navCtrl: NavController) {

  }

  checkMicrophoneAndCall(id: number) {
    cordova.plugins.diagnostic.getMicrophoneAuthorizationStatus((status) => {
      if (status === cordova.plugins.diagnostic.permissionStatus.GRANTED) {
        this.call(id);
      } else if (
        (status === cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED && cordova.platformId.toLowerCase() === 'ios')
        || (status !== cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS && cordova.platformId.toLowerCase() !== 'ios')
      ) {
        cordova.plugins.diagnostic.requestMicrophoneAuthorization((status) => {
          if (status === cordova.plugins.diagnostic.permissionStatus.GRANTED) {
            this.call(id);
          } else {
            alert("You denied access to record audio, please allow access to microphone in system settings to make audio calls");
          }
        }, function (error) {
          alert("The following error occurred: " + error);
        })
      } else {
        alert("You denied access to record audio, please allow access to microphone in system settings to make audio calls");
      }
    }, function (error) {
      alert("The following error occurred: " + error);
    });
  }

  call(id: number) {
    this.inCall = true;
    jitsiplugin.loadURL('https://meet.jit.si/wabalabadabadab' + id, null, true, (data) => {
      if (["CONFERENCE_WILL_LEAVE", "LOAD_CONFIG_ERROR", "CONFERENCE_FAILED"].indexOf(data) !== -1) {
        alert(data);
        this.inCall = false;
        jitsiplugin.destroy((data) => {
          console.log("Destroy");
        }, (err) => {
          console.log("Error");
        });
      }
    }, (err) => {
      console.log("Error : ", err);
    });
  }

  destroy() {
    this.inCall = false;
    jitsiplugin.destroy();
  }

  updateGeoPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.geoPosition = position.coords.latitude + ',' + position.coords.longitude;
    }, (error) => {
      alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
    });
  }
}
