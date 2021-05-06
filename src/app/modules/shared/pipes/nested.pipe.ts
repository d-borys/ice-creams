import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'nested'})
export class NestedPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    const keys = args[0].split('.');
    if (keys.length === 1) {
      return value[keys[0]];
    }

    let nestedValue = null;
    for (const key of keys) {
      nestedValue = nestedValue ? nestedValue[key] : null ?? value[key];
    }
    return nestedValue;
  }

}
