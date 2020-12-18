import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { AlertService, AccountService, BankService } from '../../_services';
import { User } from '../../_models';

@Component({
  selector: 'app-sellerrequest',
  templateUrl: './sellerrequest.component.html'
  //styleUrls: ['./sprequest.component.scss']
})
export class SellerRequestComponent implements OnInit {
  private photofile: File;
  private docfiles: File;
  private user: User;
  public isLoadFom1: boolean = true;
  public isLoadFom2: boolean = false;
  modelObj: any;
  bustypeList: any = [
    "Self Employed",
    "Independant Contractor",
    "Franchise"
  ];
  disList = [
    "Thiruvananthapuram",
    "Kollam",
    "Alappuzha",
    "Pathanamthitta",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanadu",
    "Kannur",
    "Kasaragod"
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

  sellerRequestForm: FormGroup;
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
  get f() { return this.sellerRequestForm.controls; }
  ngOnInit() {
    this.sellerRequestForm = this.formBuilder.group({
      establishmentName: ['', Validators.required],
      licenseNumber: ['', [Validators.required]],
      businessType: ['', [Validators.required]],
      ownersName: ['', [Validators.required]],
      identityType: ['', [Validators.required]],
      identityNumber: ['', [Validators.required]],
      bankId: ['', [Validators.required]],
      custId: ['', [Validators.required]],
      dateOfCommencement: ['', [Validators.required]],
      managingPartners: ['', [Validators.required]],
      numMaleWorkers: ['', [Validators.required]],
      numFemaleWorkers: ['', [Validators.required]],
      pan: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      residentialAddress: ['', [Validators.required]],
      guardianAddress: ['', [Validators.required]],
      place: ['', [Validators.required]],
      districtName: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      postalAddress: ['', [Validators.required]],
      supportingDocuments: ['', [Validators.required]],
      employeesDetails: ['', [Validators.required]],
    });
    this.sellerRequestForm.controls['employeesDetails'].setValue('');
    this.sellerRequestForm.controls['supportingDocuments'].setValue('');
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
    if (this.sellerRequestForm.invalid) {
      return;
    }
    this.alertService.clear();

    this.loading = true;
    const formData: FormData = new FormData();
    this.modelObj = this.sellerRequestForm.value;
    this.loading = false;
    this.isLoadFom1 = false;
    this.isLoadFom2 = false;
    //this.alertService.success('New request send successfully');
    alert('New request send successfully');
    this.router.navigate(['/dashboard/inbox'],{queryParams:{status:'New'}});
    /*formData.append('UserId', this.user.id);
    formData.append('fullName', this.modelObj.fullName);
    formData.append('gender', this.modelObj.gender);
    formData.append('dateOfBitrth', this.modelObj.dateOfBitrth);
    formData.append('mobileNumber', this.modelObj.mobileNumber);
    formData.append('email', this.modelObj.email);
    formData.append('identityType', this.modelObj.identitytype);
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
          this.router.navigate(['/dashboard/completed'],{queryParams:{title:'Service Provider Registration',message:'Your application for verification successfully submitted.'}});  
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });*/
  }
  loadForm1() {
    this.submitted = true;
    if (this.sellerRequestForm.invalid) {
      return;
    }
    this.submitted = false;
    this.isLoadFom1 = true;
    this.isLoadFom2 = false;
  }

  loadForm2() {
    this.submitted = true;
    if (this.sellerRequestForm.invalid) {
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
    console.log(this.sellerRequestForm.controls)
    Object.keys(this.sellerRequestForm.controls).forEach(key => {
      console.log(this.sellerRequestForm.controls[key])
      this.sellerRequestForm.controls[key].setErrors(null)
    });   
  }*/
}
