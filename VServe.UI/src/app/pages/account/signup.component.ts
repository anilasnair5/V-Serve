import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../../_services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../home/home.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }
  get f() { return this.registerForm.controls; }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.alertService.clear();
    //alert("Registration")
    this.loading = false;
    this.accountService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {

          this.alertService.success('Registration successful', { keepAfterRouteChange: true });
          this.registerForm.reset();          
          //this.router.navigate(['../signn'], { relativeTo: this.route });
          this.clearValidation(this.registerForm);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  private clearValidation(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].setErrors(null)
    });
  }
}
