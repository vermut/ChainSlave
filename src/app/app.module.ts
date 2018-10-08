import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

// used to create fake backend
import {fakeBackendProvider} from './_helpers/index';

import {AppComponent} from './app.component';
import {routing} from './app.routing';

import {AlertComponent} from './_directives/index';
import {AuthGuard} from './_guards/index';
import {JwtInterceptor, AuthRedirect} from './_helpers/index';
import {AlertService, AuthenticationService, UserService} from './_services/index';
import {HomeComponent} from './home/index';
import {LoginComponent} from './login/index';
import {RegisterComponent} from './register/index';
import {GamedataProvider} from '../providers/gamedata/gamedata';
import {GamePageModule} from "../pages/game/game.module";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    IonicModule.forRoot(AppComponent),
    GamePageModule
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthRedirect,
      multi: true
    },

    // provider used to create fake backend
    // fakeBackendProvider,

    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GamedataProvider
  ],
  bootstrap: [IonicApp],
  entryComponents: [AppComponent],
})

export class AppModule {
}
