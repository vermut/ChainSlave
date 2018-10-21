import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, Platform} from 'ionic-angular';
import {GameData} from "../../app/_models";
import {GamedataProvider} from "../../providers/gamedata/gamedata";
import {Observable} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {ISubscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {BackgroundMode} from '@ionic-native/background-mode';
import { Vibration } from '@ionic-native/vibration';

declare var jitsiplugin: any;
declare var navigator: any;
declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage implements OnInit, OnDestroy {
  gameData: GameData;
  latitude = undefined;
  longitude = undefined;

  private timer$: Observable<number>;
  private $timer: ISubscription;
  private $geo: ISubscription;

  constructor(private platform: Platform, private gamedataProvider: GamedataProvider, public router: Router, public backgroundMode: BackgroundMode, public vibration: Vibration) {
    platform.ready().then(() => {
      console.log('Platform ready');

      // TODO https://ionicframework.com/docs/native/location-accuracy/
      // TODO (maybe) https://ionicframework.com/docs/native/background-geolocation/


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

      navigator.geolocation.watchPosition(position => {
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
          this.$geo = this.gamedataProvider.putPosition(position).subscribe(_ => {
            }, error => {
              console.log("this.gamedataProvider.putPosition(position) " + error);
            }
          );
        }
      }, (error) => {
        console.log('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
      }, {timeout: 5000, enableHighAccuracy: true});
    });

    this.backgroundMode.enable();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  ngOnInit(): void {
    this.timer$ = TimerObservable.create(0, 1000);
    this.$timer = this.timer$.subscribe(_ =>
      this.gamedataProvider.getData().subscribe(data => {
          this.gameData = data;
        }
      ));
  }

  ngOnDestroy(): void {
    this.$timer.unsubscribe();
    this.$geo.unsubscribe();
    this.backgroundMode.enable();
    this.vibration.vibrate(500);
  }

  logout(): void {
    this.router.navigateByUrl('/login');
  }
}
