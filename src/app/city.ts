import {WeatherForecast} from './weather-forecast'
import * as moment from 'moment'
export class City{
  name
  id
  isValid
  cityJson
  country
  isPersisted
  currentForecast:WeatherForecast
  fiveDayForecast:WeatherForecast[]

  constructor(cityJson){
    this.cityJson = cityJson
    this.isValid = cityJson != undefined && cityJson.cod == 200 
    if(this.isValid){    
      this.id = cityJson.id
      this.name = cityJson.name
      this.country = cityJson.sys.country
      this.currentForecast = WeatherForecast.parseCurrent(cityJson.main, cityJson.weather, cityJson.dt)
    }
    this.fiveDayForecast = []
  }

  displayName():string{
    return `${this.name}, ${this.country}`
  }

  setFiveDayForecast(value){
    let resultDetail = {}
    for(let forecast of value.list){
      let day = new Date(forecast.dt * 1000)
      let key = `${day.getMonth() + 1}/${day.getDate()}/${day.getFullYear()}`
      let resultHash = resultDetail[key]
      if(resultHash == undefined){
        resultHash = {}
        resultHash['tempHighs'] = [forecast.main.temp_max]
        resultHash['tempLows'] = [forecast.main.temp_min]
        resultHash['temps'] = [forecast.main.temp]
        resultHash['icons'] =  [forecast.weather[0].icon]
        resultHash['overcastStatuses'] =  [forecast.weather[0].main]
        
      } else{
        resultHash['tempHighs'].push(forecast.main.temp_max)
        resultHash['tempLows'].push(forecast.main.temp_min)
        resultHash['temps'].push(forecast.main.temp)
        resultHash['icons'].push(forecast.weather[0].icon) 
        resultHash['overcastStatuses'].push(forecast.weather[0].main)
      }
      resultDetail[key] = resultHash
    }
    console.log(resultDetail)
    for(let key in resultDetail){
     let x = new WeatherForecast()
     x.date = new Date(key)
    if(moment().startOf('D').isSame(moment(x.date).startOf('D'))){
      x.high = this.currentForecast.high
      x.low = this.currentForecast.low
     }else{
     x.high = Math.max.apply(null, resultDetail[key]['tempHighs'])
     x.low = Math.min.apply(null, resultDetail[key]['tempLows'])
     }
     x.overcast_icon = City.findMode(resultDetail[key]['icons'])
     x.overcast = City.findMode(resultDetail[key]['overcastStatuses'])
     console.log(x)
     this.fiveDayForecast.push(x)
    }
  }

  static findMode(values) {
    let counted = values.reduce((acc, curr) => { 
        if (curr in acc) {
            acc[curr]++;
        } else {
            acc[curr] = 1;
        }

        return acc;
    }, {});

    let mode = Object.keys(counted).reduce((a, b) => counted[a] > counted[b] ? a : b);

    return mode;
}

  

}
