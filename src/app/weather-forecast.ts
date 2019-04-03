export class WeatherForecast{
  date
  overcast
  overcast_icon
  currentTemperature
  high
  low

  constructor(){
    

  }

  static parseCurrent(main , weather, date):WeatherForecast{
    let x = new WeatherForecast()
    x.currentTemperature = main.temp 
    if(weather.length > 0){
      x.overcast = weather[0].main
      x.overcast_icon = weather[0].icon
    }
    x.high = main.temp_max
    x.low = main.temp_min
    x.date = new Date(date * 1000)
    return x;
  }

  static parseForecast(forecast):WeatherForecast{
    let x = new WeatherForecast
    x.date = forecast.dt
    x.high = forecast.temp.max
    x.low = forecast.temp.min
    x.overcast_icon = forecast.weather.icon
    x.overcast = forecast.weather.main
    return x;

  }
}