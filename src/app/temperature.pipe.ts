import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: any, unit:string): any {
    return `${value}° ${unit == 'imperial'? 'F' : 'C'}`;
  }

}
