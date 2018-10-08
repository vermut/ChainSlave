import {Routes, RouterModule} from '@angular/router';

import {GamePage} from '../pages/game/game';
import {LoginComponent} from './login/index';
import {AuthGuard} from './_guards/index';

const appRoutes: Routes = [
  {path: '', component: GamePage, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
