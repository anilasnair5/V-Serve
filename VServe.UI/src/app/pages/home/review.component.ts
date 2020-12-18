import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User, Feedback } from 'src/app/_models';
import { AccountService, AlertService, ServiceProviderService } from 'src/app/_services';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./home.component.scss', './pagination.component.scss', './review.component.scss']
})
export class ReviewComponent implements OnInit {
  fid: string;
  searchtext: string;
  user: User;
  isDataExist: boolean = false;
  feedbacks: Feedback[];
  page:number  = 1;
  pageSize:number  = 5;
  reviewForm: FormGroup;
  loading = false;
  submitted = false;
  feedbackModel: Feedback=<Feedback>{};
  get f() { return this.reviewForm.controls; }
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private acctService: AccountService,
    private alertService: AlertService,
    private spservice: ServiceProviderService) {
    this.acctService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.reviewForm = this.formBuilder.group({
      comment: ['', Validators.required]
    });
    this.searchtext = this.route.snapshot.queryParams['searchtext'] || '';
    this.fid = this.route.snapshot.queryParams['spid'] || '';
    this.fetchFeedback();
  }
  private fetchFeedback() {
    this.alertService.clear();
    this.spservice.getFeedbacks(this.fid)
      .pipe(first())
      .subscribe(
        data => {
          this.feedbacks = <Feedback[]>data;          
          if (this.feedbacks != null && this.feedbacks.length > 0)
            this.isDataExist = true;
        },
        error => {
          this.alertService.clear();
          this.alertService.error(error);
        });
  }
  public gotoSearchPage(): void {
    this.router.navigate(['/search'], { queryParams: { searchtext: this.searchtext } });
  }
  public PostFeedback() {
    this.submitted = true;
    this.alertService.clear();
    // stop here if form is invalid
    if (this.reviewForm.invalid) {
      return;
    }
    if (this.user != null) {
      this.loading = true;
      this.alertService.clear();

      this.loading = false;
      
      this.feedbackModel.feedback = this.reviewForm.value.comment;
      this.feedbackModel.serviceProviderDetailsId = Number(this.fid);
      this.feedbackModel.loginId = Number(this.user.id);
      this.spservice.sendFeedback(this.feedbackModel)
        .pipe(first())
        .subscribe(
          data => {

            this.alertService.success('Your comment posted.', { keepAfterRouteChange: true });
            this.fetchFeedback();
            this.reviewForm.reset();
            this.clearValidation(this.reviewForm);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    }
    else {
      this.alertService.clear();
      this.alertService.warn('You need to login for rating a service!', { keepAfterRouteChange: true });
    }
  }
  private clearValidation(form: FormGroup): void {
    Object.keys(form.controls).forEach(key => {
      form.controls[key].setErrors(null)
    });
  }

}
