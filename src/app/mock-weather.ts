import { Data } from '@angular/router';

export class MockWeather{
  static result = {"coord":{"lon":-76.51,"lat":37.1},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"base":"stations","main":{"temp":272.73,"pressure":1028,"humidity":86,"temp_min":270.93,"temp_max":274.82},"visibility":16093,"wind":{"speed":1.81,"deg":134.506},"clouds":{"all":1},"dt":1552467008,"sys":{"type":1,"id":4586,"message":0.008,"country":"US","sunrise":1552475985,"sunset":1552518698},"id":420038296,"name":"Newport News","cod":200}

  static errorResult = {"cod":"404","message":"city not found"}
}