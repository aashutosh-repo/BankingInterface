import { AbstractControl, ValidatorFn } from "@angular/forms";

export function phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const valid = /^[0-9]{10}$/.test(value) && parseInt(value.substring(0, 2), 10) > 60;
      return valid ? null : { invalidPhone: true };
    };
  }

  export function mailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const valid = emailPattern.test(value);
      return valid ? null : { invalidEmail: true };
    };
  }

  export function currentOrFutureDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const inputDate = new Date(control.value);
      const today = new Date();
  
      // Reset time to 00:00:00 for accurate date-only comparison
      today.setHours(0, 0, 0, 0);
      inputDate.setHours(0, 0, 0, 0);
  
      return inputDate >= today ? null : { pastDate: true };
    };
  }