import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroToNumber'
})
export class ZeroToNumberPipe implements PipeTransform {

  transform(value) : any {
    let res = [];
    for (let i = 0; i <= value; i++) {
      res.push(i);
    }
    return res;
  }
}

