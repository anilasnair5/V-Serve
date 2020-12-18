import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AccountService,AlertService } from '../../_services';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../home/home.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.alertService.clear();
    this.accountService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {      
          if (this.returnUrl == "/") {          
            if (data.role == "User")
            {
              this.router.navigate(['/dashboard/inbox', { relativeTo: this.route }])
            }
            else if (data.role == "Bank Admin")
              this.router.navigate(['/dashboard', { relativeTo: this.route }])
            else if (data.role == "Admin")
              this.router.navigate(['/admin/home', { relativeTo: this.route }])
            else
              this.router.navigate(['/home'], { relativeTo: this.route });
          }
          else
            this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
