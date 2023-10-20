import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ConfirmPasswordValidator } from '../lib/validators/ConfirmPasswordValidator';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from '../types/api/response.types';

@Component({
  templateUrl: 'register-login.component.html',
  selector: 'app-register-signin',
})
export class RegisterAndLoginComponent implements OnInit {
  registerForm: FormGroup | any;
  loginForm: FormGroup | any;
  loading: boolean = false;
  submitted: boolean = false;
  formName: string = 'auth';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        login: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/),
          ],
        ],
        passwordConfirm: ['', [Validators.required]],
      },
      { validator: ConfirmPasswordValidator.MatchPassword }
    );

    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+$/),
        ],
      ],
    });
  }

  get f() {
    return this.formName === 'auth'
      ? this.loginForm.controls
      : this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.formName === 'auth') {
      if (this.loginForm.invalid) return;
      this.loading = true;
      this.userService
        .login(this.loginForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.userService.saveJWT(data.jwt);
            this.loading = false;
          },
          ({ error }: { error: ErrorResponse }) => {
            this.loading = false;
            this.toastr.error(error ? error.error : 'Произошла ошибка');
          }
        );
    }

    if (this.formName === 'register') {
      if (this.registerForm.invalid) return;
      this.loading = true;
      this.userService
        .register(this.registerForm.value)
        .pipe(first())
        .subscribe(
          (data) => {
            this.userService.saveJWT(data.jwt);
            this.loading = false;
          },
          ({ error }: { error: ErrorResponse }) => {
            this.loading = false;
            this.toastr.error(
              error ? error.error : 'Произошла ошибка на сервере'
            );
          }
        );
    }
  }
}
