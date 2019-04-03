import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assetImage'
})
export class AssetImagePipe implements PipeTransform {

  transform(file: string): string {
    return `/assets/images/svg/${file}`
  }
}
