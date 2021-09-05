import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';
import { CustomValidationService } from '@app/core/services';

@Directive({
  selector: '[appMatchPassword]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchPasswordDirective, multi: true }]
})
export class MatchPasswordDirective implements Validator {

  @Input('appMatchPassword') MatchPassword: string[] = [];

  constructor(
    private customValidationService: CustomValidationService
  ) { }

  validate(formGroup: FormGroup): ValidationErrors {
    return this.customValidationService.MatchPassword(this.MatchPassword[0], this.MatchPassword[1])(formGroup);
  }

}
