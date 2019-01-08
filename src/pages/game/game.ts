import {Component, OnDestroy, OnInit} from '@angular/core';
import {IonicPage, Platform} from 'ionic-angular';
import {GameData} from "../../app/_models";
import {GamedataProvider, SERVER_URL} from "../../providers/gamedata/gamedata";
import {Observable} from "rxjs";
import {TimerObservable} from "rxjs/observable/TimerObservable";
import {ISubscription} from "rxjs/Subscription";
import {Router} from "@angular/router";
import {BackgroundMode} from '@ionic-native/background-mode';

declare var jitsiplugin: any;
declare var navigator: any;
declare var cordova: any;
declare var BackgroundGeolocation: any;

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

  constructor(private platform: Platform, private gamedataProvider: GamedataProvider, public router: Router) {
    platform.ready().then(() => {
      console.log('Platform ready');

      // TODO https://ionicframework.com/docs/native/location-accuracy/
      // TODO (maybe) https://ionicframework.com/docs/native/background-geolocation/

      let currentUser;
      try {
        currentUser = JSON.parse(localStorage.getItem('currentUser'));
      } catch (e){}

      if (currentUser && currentUser.JSESSIONID && currentUser.token) {
        BackgroundGeolocation.configure({
          locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
          desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
          stationaryRadius: 0,
          distanceFilter: 0,
          startOnBoot: false,
          stopOnStillActivity: false,
          notificationTitle: 'Background tracking',
          notificationText: 'enabled',
          debug: true,
          interval: 3000,
          fastestInterval: 5000,
          activitiesInterval: 6000,
          url: SERVER_URL + '/api/gamedata',
          httpHeaders: {
            'Cookie': `JSESSIONID=${currentUser.JSESSIONID}`,
            'Authorization': `Bearer ${currentUser.token}`
          },
          // customize post properties
          postTemplate: {
            timestamp: '@time',
            latitude:  '@latitude',
            longitude: '@longitude',
          }
        });
        // BackgroundGeolocation.on('start', function() {
          // alert('[INFO] BackgroundGeolocation service has been started');
        // });
        BackgroundGeolocation.checkStatus(function(status) {
          console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
          console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
          console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

          // you don't need to check status before start (this is just the example)
          if (!status.isRunning) {
            BackgroundGeolocation.start(); //triggers start on start event
          }
        });
      } else {
        this.router.navigate(['login'], {queryParams: {returnUrl: ''}});
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  ngOnInit(): void {
    this.timer$ = TimerObservable.create(0, 5000);
    this.$timer = this.timer$.subscribe(_ =>
      this.gamedataProvider.getData().subscribe(data => {
          this.gameData = data;
          // navigator.vibrate(500);
        }
      ));
  }

  ngOnDestroy(): void {
    BackgroundGeolocation.stop();
    this.$timer.unsubscribe();
  }

  logout(): void {
    navigator.vibrate(5000);
    this.router.navigate(['login'], {queryParams: {returnUrl: ''}});
  }
}
