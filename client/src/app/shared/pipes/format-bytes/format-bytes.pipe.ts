import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatBytes'
})
export class FormatBytesPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    if (value === 0) { return null }
    else if (value === 1) { return 'byte'; }
      
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB'];
    let [i,newValue]  = [0, value];

    while(newValue >= 1000){
      newValue /= 1000;
      i++;
    }

    return `${newValue.toFixed(2)} ${sizes[i]}`;
  }

}
