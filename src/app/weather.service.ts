import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import{MockWeather} from "./mock-weather";
import { MessageService } from './message.service';
import { City } from './city';
import{UserService } from './user.service'
import { AuthenticationService } from './authentication.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast'
  private apiKey = "c59be74fa057a859524c28b0e33cfe64"
  private iconUrl = "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/01d.png"
  
  constructor(  private http: HttpClient,
    private messageService: MessageService,
    private userService:UserService,
    private authService:AuthenticationService 
    ) { }

  zipcodeSearchUrl(zipcode):string{
    return `${this.weatherUrl}?zip=${zipcode}&appid=${this.apiKey}&units=${this.userService.getUserMetricSettingUnit(this.authService.getLoggedInUser().email)}`
  }

  searchById(cityId:string):Observable<any>{
    return this.http.get(`${this.weatherUrl}?id=${cityId}&appid=${this.apiKey}&units=${this.userService.getUserMetricSettingUnit(this.authService.getLoggedInUser().email)}`).pipe(
      catchError(this.handleError('searchById', new City('')))
    );
  }

  search5DayForecase(cityId:string):Observable<any>{
    return this.http.get(`${this.forecastUrl}?id=${cityId}&appid=${this.apiKey}&units=${this.userService.getUserMetricSettingUnit(this.authService.getLoggedInUser().email)}`).pipe(
      catchError(this.handleError('search5DayForecase', {}))
    );
  }

  searchZipcode(zipcode:string):Observable<any>{
    return this.http.get(this.zipcodeSearchUrl(zipcode)).pipe(
      catchError(this.handleError('searchZipcode', []))
    )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.messageService.show(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
