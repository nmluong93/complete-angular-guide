import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false // this make pipe will be trigger whenever the listened data (servers) change
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): unknown {
    if (value.length  === 0) {
      return value;
    }
    if (filterString === null || filterString === undefined || filterString === '') {
      return value;
    }
    const result = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        result.push(item);
      }
    }
    return result;
  }

}
