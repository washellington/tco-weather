import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CitiesComponent } from './cities/cities.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import {CityDetailComponent} from './city-detail/city-detail.component';
import {AuthGuard} from './auth/auth.guard'
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cities', component: CitiesComponent,  canActivate: [AuthGuard] },
  { path: 'cities/:id', component: CityDetailComponent,  canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent,  canActivate: [AuthGuard] },
  { path: 'search', component: SearchComponent,  canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
