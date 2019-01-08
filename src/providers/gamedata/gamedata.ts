import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GameData} from "../../app/_models";

/*
  Generated class for the GamedataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GamedataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GamedataProvider Provider');
  }

  getData() {
    return this.http.get<GameData>(SERVER_URL + '/api/gamedata', {withCredentials: true});
  }

  putPosition(position: Position) {
    return this.http.put<Position>(SERVER_URL + '/api/gamedata', {
      timestamp: position.timestamp,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }, { withCredentials: true });
  }
}

export const SERVER_URL = "http://chainreactor.herokuapp.com";
// export const SERVER_URL = "http://192.168.118.63:8080";
