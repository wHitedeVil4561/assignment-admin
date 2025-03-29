import { Pipe, PipeTransform } from '@angular/core';
import { ErrorHintDirective } from '../directives/error-hint.directive';
import { getErrorValidationMessage } from '../../config/helper';

@Pipe({
  name: 'errorHint',
  standalone: true
})
export class ErrorHintPipe implements PipeTransform {

  transform( errorObj: any, errorDirective: ErrorHintDirective, touched: boolean | null ): string {
    const errors = Object.entries(errorObj ?? {});
    if (!errors.length || !touched) return '';
    const controlName = errorDirective.controlName ?? errorDirective.formControlName;
    return getErrorValidationMessage(controlName, errors);
  }
}
