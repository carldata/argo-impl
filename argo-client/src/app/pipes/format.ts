import * as _ from 'lodash';
import * as dateFns from 'date-fns';
import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({name: 'format'})
export class FormatPipe implements PipeTransform {
  transform(value: any): string {
    if (_.isDate(value))
      return dateFns.format(value, environment.dateFormat);
    if (_.isArray(value))
      return `${value.length}`;
    return value;
  }
}