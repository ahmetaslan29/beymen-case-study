import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'turkishUppercase',
  standalone: true
})
export class TurkishUppercasePipe implements PipeTransform {
  transform(value: string): string {
    return value?.toLocaleUpperCase('tr-TR') || '';
  }
}
