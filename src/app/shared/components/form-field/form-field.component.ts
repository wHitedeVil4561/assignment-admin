import { Component, ContentChild } from '@angular/core';
import { ErrorHintDirective } from '../../directives/error-hint.directive';
import { ErrorHintPipe } from '../../pipes/error-hint.pipe';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [ErrorHintPipe],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent {
@ContentChild(ErrorHintDirective, { static: true })
  errorHintDirective!: ErrorHintDirective;
}
