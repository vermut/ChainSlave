import {Component, OnInit} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {GameData} from "../../app/_models";
import {GamedataProvider} from "../../providers/gamedata/gamedata";

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage implements OnInit {
  gameData: GameData;

  constructor(private gamedataProvider: GamedataProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

  ngOnInit(): void {
    this.gamedataProvider.getData().subscribe(data => {
      this.gameData = data;
    });
  }

}
