import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService, AccountService, BankService } from '../../_services';
import { User } from '../../_models';

@Component({
  selector: 'app-jobpost',
  templateUrl: './jobpost.component.html'
  //styleUrls: ['./sprequest.component.scss']
})
export class JobPostComponent implements OnInit {
  private user: User;
  public isLoadFom1: boolean = true;
  public isLoadFom2: boolean = false;
  modelObj: any;  
  identities: any = [
    "ARNU",
    "CCPT",
    "CUST", 
    "DRLC",
    "EMPL",
    "NIDN",
    "SOSE",
    "TXID",
    "Aadhar",
    "Voters Id",
    "Driving License",
    "Passport"
  ];
  banks: any = null;
  serviceQuestions: any = [];
  answers: any = [];

  jobPostForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bankService: BankService,    
    private alertService: AlertService,
    private acctService: AccountService,
  ) {
    this.acctService.user.subscribe(x => this.user = x);
  }
  get f() { return this.jobPostForm.controls; }
  ngOnInit() {
    this.jobPostForm = this.formBuilder.group({
      jobCategory: ['', Validators.required],
      joblocation: ['', [Validators.required]],
      identityType: ['', [Validators.required]],
      identityNumber: ['', [Validators.required]],
      bankId: ['', [Validators.required]],
      custId: ['', [Validators.required]],    
      posDescription: ['', [Validators.required]],
      payscale: ['', [Validators.required]],
      requirements: ['', [Validators.required]],
      responsibilities: ['', [Validators.required]],
      Contact: ['',[Validators.required]],
      jobemail: ['',[Validators.required]],
      address: ['',[Validators.required]], 
      Description: ['',[Validators.required]]     
    });
    
    this.bankService.getAllBanks()
      .pipe(first())
      .subscribe(
        data => {
          this.banks = data;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
    this.bankService.getRiskAssessmentQuestions()
      .pipe(first())
      .subscribe(
        data => {
          this.serviceQuestions = data;
        },
        error => {
          console.log(error)
          this.alertService.error(error);
          this.loading = false;
        });
  }
  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    // stop here if form is invalid
    if (this.jobPostForm.invalid) {
      return;
    }
    this.alertService.clear();

    this.loading = true;
    const formData: FormData = new FormData();
    this.modelObj = this.jobPostForm.value;
    this.loading = false;
    this.isLoadFom1 = false;
    this.isLoadFom2 = false;
    //this.alertService.success('New Job Post send successfully');   
    alert('New Job Post send successfully')
    this.router.navigate(['/dashboard/inbox'],{queryParams:{status:'New'}});
  }
  loadForm1() {
    this.submitted = true;
    if (this.jobPostForm.invalid) {
      return;
    }
    this.submitted = false;
    this.isLoadFom1 = true;
    this.isLoadFom2 = false;
  }

  loadForm2() {
    this.submitted = true;
    if (this.jobPostForm.invalid) {
      return;
    }
    this.submitted = false;
    this.isLoadFom1 = false;
    this.isLoadFom2 = true;
  }  
}
