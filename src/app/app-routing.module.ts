import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CitiesComponent } from './cities/cities.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import {CityDetailComponent} from './city-detail/city-detail.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cities', component: CitiesComponent },
  { path: 'cities/:id', component: CityDetailComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
