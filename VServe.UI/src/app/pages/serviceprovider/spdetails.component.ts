import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';


import { AccountService, AlertService,BankService,ServiceProviderService } from '../../_services';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {ServiceProvider,Bank,QuestAnswerModel,FFDCVerification,SpUpdateStatus, User} from '../../_models'
import { Key } from 'protractor';
import { stringify } from 'querystring';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sprequest',
  templateUrl: './spdetails.component.html',
  styleUrls: ['./spdetails.component.scss']
})
export class SpdetailsComponent implements OnInit {

  status:string;
  spid:string;
  bankqstns: any[]=[];
  spdtlsdata: ServiceProvider = <ServiceProvider>{};
  ffdcVerify:FFDCVerification = <FFDCVerification>{};
  spupdate:SpUpdateStatus = <SpUpdateStatus>{};
  imageUrl: any;
  public spRating: any;
  questAnsDet:QuestAnswerModel[]=[]; 
  feedbackarray:any[]=[];
  public spFeedback:any[]=[];
  public spStatus:any;
  public spReason:any;
  IsVerified:boolean;
  IsRejected:boolean = false;

  spRequestForm: FormGroup;

  loading = false;
  submitted = false;
  IsUser: boolean = false;
  IsBankAdmin = false;
  user: User;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bankService: BankService,
    private spService: ServiceProviderService,
    private alertService: AlertService,
    private accountService:AccountService
  ) { 
    this.accountService.user.subscribe(x => this.user = x);
    this.status = this.route.snapshot.queryParams['status'] || '';
    if (this.user.role.toLowerCase() == "bank admin") {
      this.IsBankAdmin = true;
      this.IsUser = false;
    }
    else if (this.user.role.toLowerCase() == "user") {
      this.IsBankAdmin = false;
      this.IsUser = true;
    }
  }

  ngOnInit() {
    this.bankService.getRiskAssessmentQuestions().subscribe(data => {
      this.bankqstns = data;
      this.spid=this.route.snapshot.queryParams['spid'] || '';
      this.getSpDetails(this.spid);
    }, 
    error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }
  private getSpDetails(id:string) {
    this.spService.spdetailsgetById(id).subscribe(data => {
      this.spdtlsdata = data;
      this.imageUrl = environment.apiUrl + "/Photos/"+ this.spdtlsdata.photoUploaded;
      this.spRating = this.spdtlsdata.serviceProviderRate;
      this.mapQuestAns();

      this.spService.verificationById(this.spid).subscribe(data => {
        this.ffdcVerify = data;        
      },
      error => {
        console.log(error)
         //this.alertService.error(error);
        this.loading = false;
      });
       //status and feedback
      this.feedbackarray = [];
      this.spFeedback = [];
     
      for(let i = 0 ; i < this.spdtlsdata.serviceProviderFeedbacks.length; i++)
      {
        this.feedbackarray= this.spdtlsdata.serviceProviderFeedbacks[i];
        const objectArray = Object.entries(this.feedbackarray);
        
        let feedbck:any;
        let usrname:any;
        objectArray.forEach(([key, value]) => {
          if(key == "feedback")
          {
            feedbck = value;
          } 
          if(key == "username")
          {
            usrname = value;
          } 
          if(feedbck != null && usrname != null)
          {
            let myObject = {
              feedback:feedbck, 
              username:usrname,
            }
            this.spFeedback.push(myObject);
          }            
        });        
      }
      this.spStatus = this.spdtlsdata.serviceProviderStatus.status; 
      if(this.spStatus == "Verified")
      {
         this.IsVerified = true;
      }
      else {
         this.IsVerified = false;
         this.IsRejected = true;
         this.spReason = this.spdtlsdata.serviceProviderStatus.reason;
      }
      
    },
    error => {
      this.alertService.error(error);
      this.loading = false;
    });
  }
  mapQuestAns(){
    this.questAnsDet=[];   
    this.bankqstns.forEach(question => {
      let ans = this.spdtlsdata.answers.find(answer=>answer.questionId===question.id);
      let questAnsModel = new QuestAnswerModel();
      questAnsModel.id = question.id;
      questAnsModel.question = question.question;
      questAnsModel.answer = ans.answer;
      this.questAnsDet.push(questAnsModel);
    });
       
  }

  //update status
  
  verifyServiceProvider()
  {
    this.alertService.clear();
    this.spupdate.ServiceProviderId = this.spdtlsdata.serviceProviderId;
    this.spupdate.RelevantDocumentsSubmited = true;
    this.spupdate.Status = "Verified";
    this.spupdate.Reason = "All Ok"
    this.spService.updateStatusVerify(this.spupdate)
    .pipe(first())
    .subscribe(
      data => {
        this.alertService.clear();
        this.alertService.success('Verified Successfully!!!', { keepAfterRouteChange: true });       
        this.IsRejected = false;
        this.getSpDetails(this.spid);

      },
      error => {
        console.log(error)
        this.alertService.error(error);
        this.loading = false;
      });
  }

  rejectServiceProvider()
  {
    this.alertService.clear();
    this.spupdate.ServiceProviderId = this.spdtlsdata.serviceProviderId;
    this.spupdate.RelevantDocumentsSubmited = true;
    this.spupdate.Status = "Rejected";
    this.spupdate.Reason = "Document verification failed!!!"
    this.spReason = this.spupdate.Reason;
    this.spService.updateStatusReject(this.spupdate)
    .pipe(first())
    .subscribe(
      data => {
        this.alertService.clear();
        this.alertService.success('Rejected Successfully!!!', { keepAfterRouteChange: true });
        this.getSpDetails(this.spid);
        this.IsRejected = true; 
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
    this.loading = true;
    this.loading = false;
  }
  Back()
  {
    this.router.navigate(['/dashboard/inbox'], { queryParams: { status: this.status } });
  }
}
