import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CitiesComponent } from './cities/cities.component';
import { SearchComponent } from './search/search.component';
import { MessagesComponent } from './messages/messages.component';
import { HttpClientModule }    from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersistenceModule } from 'angular-persistence';
import { AssetImagePipe } from './asset-image.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CityDetailComponent } from './city-detail/city-detail.component';
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';
import { SettingsComponent } from './settings/settings.component';
import { TemperaturePipe } from './temperature.pipe';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CitiesComponent,
    SearchComponent,
    MessagesComponent,
    DashboardComponent,
    AssetImagePipe,
    CityDetailComponent,
    WeatherDetailComponent,
    SettingsComponent,
    TemperaturePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PersistenceModule,
    NgbModule,
    InlineSVGModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
