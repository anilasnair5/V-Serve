import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService, AccountService, BankService, ServiceProviderService } from '../../_services';
import { User } from '../../_models';

@Component({
  selector: 'app-sprequest',
  templateUrl: './sprequest.component.html'
  //styleUrls: ['./sprequest.component.scss']
})
export class SPRequestComponent implements OnInit {
  private photofile: File;
  private docfiles: File;
  private user: User;
  public isLoadFom1: boolean = true;
  public isLoadFom2: boolean = false;
  modelObj: any;
  genderList: any = [
    "Male",
    "Female",
    "Other"
  ];
  serviceCategoryList = [
    "Trades - Plumber",    
    "Electrician",
    " Carpenter",
    "Tailor",
    "Security",
    "Servant",
    "Housemaid",
    "AC Mechanic",
    "Automobile Mechanic",
    "Home Nurse",
    "Service Engineer",
    "Technician",
    "Beautician",
    "Photographer",
    "Makeup Artist",
    "Mehandi Designer",
    "Disinfectant Cleaners",    
    "Daily Wage Worker",
    "Food Services",
    "Others"
  ];
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

  spRequestForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bankService: BankService,
    private spService: ServiceProviderService,
    private alertService: AlertService,
    private acctService: AccountService,
  ) {
    this.acctService.user.subscribe(x => this.user = x);
  }
  get f() { return this.spRequestForm.controls; }
  ngOnInit() {
    this.spRequestForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      gender: ['', [Validators.required]],
      dateOfBitrth: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      identityType: ['', [Validators.required]],
      identityNumber: ['', [Validators.required]],
      currentlyEmployed: [''],
      bankId: ['', [Validators.required]],
      custId: ['', [Validators.required]],
      preferedLocation: ['', [Validators.required]],
      category: ['', [Validators.required]],
      presentAddress: ['', [Validators.required]],
      permanentAddress: ['', [Validators.required]],
      emergencyContactName: ['', [Validators.required]],
      emergencyContactNumber: ['', [Validators.required]],
      jobTitle: ['', [Validators.required]],
      jobDescription: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      expectedPay: ['', [Validators.required]],
      supportingDocuments: ['', [Validators.required]],
      photo: ['', [Validators.required]],
      VendorAnswers: ['']
    });
    this.spRequestForm.controls['photo'].setValue('');
    this.spRequestForm.controls['supportingDocuments'].setValue('');  
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
    if (this.spRequestForm.invalid) {
      return;
    }
    this.alertService.clear();

    this.loading = true;
    const formData: FormData = new FormData();
    this.modelObj = this.spRequestForm.value;
    formData.append('UserId', this.user.id);
    formData.append('fullName', this.modelObj.fullName);
    formData.append('gender', this.modelObj.gender);
    formData.append('dateOfBitrth', this.modelObj.dateOfBitrth);
    formData.append('mobileNumber', this.modelObj.mobileNumber);
    formData.append('email', this.modelObj.email);
    formData.append('IdentityType', this.modelObj.identityType);
    formData.append('identityNumber', this.modelObj.identityNumber);
    formData.append('currentlyEmployed', this.modelObj.currentlyEmployed);
    formData.append('bankId', this.modelObj.bankId);
    formData.append('custId', this.modelObj.custId);
    formData.append('preferedLocation', this.modelObj.preferedLocation);
    formData.append('ServiceCategory', this.modelObj.category);
    formData.append('presentAddress', this.modelObj.presentAddress);
    formData.append('permanentAddress', this.modelObj.permanentAddress);
    formData.append('POCName', this.modelObj.emergencyContactName);
    formData.append('POCMobile', this.modelObj.emergencyContactNumber);
    formData.append('jobTitle', this.modelObj.jobTitle);
    formData.append('jobDescription', this.modelObj.jobDescription);
    formData.append('experience', this.modelObj.experience);
    formData.append('expectedPay', this.modelObj.expectedPay);
    formData.append('VendorAnswers', "[{'Answer':'No','OtherInfo':'tst','QuestionId':1},{'Answer':'No','OtherInfo':'Test Other','QuestionId':2},{'Answer':'No','OtherInfo':'Test Other','QuestionId':3},{'Answer':'No','OtherInfo':null,'QuestionId':4},{'Answer':'No','OtherInfo':'Test Other','QuestionId':5}]");
    formData.append('supportingDocuments', this.docfiles,);
    formData.append('Photo', this.photofile);

    this.spService.newRequest(formData)
      .pipe(first())
      .subscribe(
        data => {
          alert('Your application for verification successfully submitted.');
          this.router.navigate(['/dashboard/inbox'],{queryParams:{status:'New'}});
          //this.router.navigate(['/dashboard/completed'],{queryParams:{title:'Service Provider Registration',message:'Your application for verification successfully submitted.'}});  
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  loadForm1() {
    this.submitted = true;
    if (this.spRequestForm.invalid) {
      return;
    }
    this.submitted = false;
    this.isLoadFom1 = true;
    this.isLoadFom2 = false;
  }

  loadForm2() {
    this.submitted = true;
    if (this.spRequestForm.invalid) {
      return;
    }
    this.submitted = false;
    this.isLoadFom1 = false;
    this.isLoadFom2 = true;
  }
  public onPhotoFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.photofile = file;
  }
  public onDocFileSelected(event: any) {
    this.docfiles = event.target.files[0];
  }
  /*private clearValidation(): void {
    console.log(this.spRequestForm.controls)
    Object.keys(this.spRequestForm.controls).forEach(key => {
      console.log(this.spRequestForm.controls[key])
      this.spRequestForm.controls[key].setErrors(null)
    });   
  }*/
}
