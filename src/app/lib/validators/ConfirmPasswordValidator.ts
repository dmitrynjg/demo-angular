import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
    /**
     * Check matching password with confirm password
     * @param control AbstractControl
     */
    static MatchPassword(control: AbstractControl) {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('passwordConfirm')?.value;
        
        if (password !== confirmPassword) {
            const error = control.get('passwordConfirm')?.setErrors({matchPassword: true});
            return error;
        } else {
            return null;
        }
    }
}