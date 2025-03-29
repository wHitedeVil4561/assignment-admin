import { ERROR_MESSAGES, ErrorTypes } from './error.message';

function checkErrorType(errors: [string, any][], key: ErrorTypes) {
  return errors.some(([errorKey]) => errorKey === key);
}

function getErrorMessage(errors: [string, any][], key: ErrorTypes) {
  return errors.find(([k ]) => k === key)?.[1];
}

export function getErrorValidationMessage(
  formControlName: string,
  errors: [string, any][]
): string {
  switch (true) {
    case checkErrorType(errors, 'required'):
      return ERROR_MESSAGES['required'](formControlName);
    case checkErrorType(errors, 'invalidYear'):
      return ERROR_MESSAGES['invalidYear']();
    case checkErrorType(errors, 'invalidDate'):
      return ERROR_MESSAGES['invalidDate']();
    case checkErrorType(errors, 'email'):
      return ERROR_MESSAGES['email']();
    case checkErrorType(errors, 'pattern'):
      return ERROR_MESSAGES['pattern'](formControlName);
    case checkErrorType(errors, 'matDatepickerMin'):
      return ERROR_MESSAGES['matDatepickerMin'](formControlName,getErrorMessage( errors, 'matDatepickerMin' )?.min);
    case checkErrorType(errors, 'minlength'):
      return ERROR_MESSAGES['minlength'](formControlName, getErrorMessage( errors, 'minlength' )?.requiredLength);
    case checkErrorType(errors, 'maxlength'):
      return ERROR_MESSAGES['maxlength'](formControlName, getErrorMessage( errors, 'maxlength' )?.requiredLength);
    case checkErrorType(errors, 'min'):
      return ERROR_MESSAGES['min'](formControlName, getErrorMessage( errors, 'min' )?.min);
    default:
      return '';
  }
}
