import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService, ServiceProviderService, AccountService } from 'src/app/_services';
import { first } from 'rxjs/operators';
import { ServiceProvider, SPRate, User } from 'src/app/_models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./home.component.scss', './pagination.component.scss', './search.component.scss']
})
export class SearchComponent implements OnInit {

  public searchtext: string;
  public category: string;
  public photourl: string;
  public isDataExist: boolean = false;
  public showbtn: boolean = false;
  public selectedrow: number = -1;
  private selectedSpId: string = "-1";
  private selectedRate: number = 0;
  private rateObj: SPRate;
  private user: User;
  page = 1;
  pageSize = 3;
  public serviceCategoryList = [
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
  public searchresult: ServiceProvider[] = [];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private spservice: ServiceProviderService,
    private acctService: AccountService,
    private alertService: AlertService) {
    this.acctService.user.subscribe(x => this.user = x);
  }
  ngOnInit() {
    // an example array of 150 items to be paged  
    this.searchtext = this.route.snapshot.queryParams['searchtext'] || '';
    this.category = this.route.snapshot.queryParams['category'] || 'Services';
    this.photourl = environment.apiUrl + "/Photos/";
    this.search(this.searchtext, this.category);
  }
  private search(location: string, category: string) {
    if (category.toLowerCase() == "services")
      category = "";
    this.isDataExist = false;
    this.searchresult = [];
    this.alertService.clear();
    this.spservice.search(location, category)
      .pipe(first())
      .subscribe(
        data => {
          this.searchresult = <ServiceProvider[]>data;
          if (this.searchresult != null && this.searchresult.length > 0)
            this.isDataExist = true;
        },
        error => {
          this.alertService.clear();
          this.alertService.error(error);
        });
  }
  searchbuttonclick() {
    //alert("hi")
    this.router.navigate(['/search'], { queryParams: { searchtext: this.searchtext, category: this.category } });
    this.search(this.searchtext, this.category);
  }
  /*ngAfterViewInit(): void {
  }*/
  onRateChange(rating: number, spId: string, rownum: number) {
    this.alertService.clear();
    if (this.user != null) {
      this.selectedrow = rownum;
      this.showbtn = true;
      this.selectedSpId = spId;
      this.selectedRate = rating;
    }
    else {
      this.alertService.clear();
      this.search(this.searchtext, this.category);
      this.alertService.warn('You need to login for rating a service!', { keepAfterRouteChange: true });
    }
  }
  SetRate() {
    //alert(this.selectedRate+","+this.selectedSpId)
    this.alertService.clear();
    if (this.user != null) {
      this.rateObj = new SPRate();
      this.rateObj.LoginId = this.user.id;
      this.rateObj.Rating = this.selectedRate;
      this.rateObj.ServiceProviderDetailsId = this.selectedSpId;

      this.spservice.setRate(this.rateObj)
        .pipe(first())
        .subscribe(
          data => {
            //this.alertService.success('', { keepAfterRouteChange: true });
            this.cancelRate();            
          },
          error => {
            this.cancelRate();            
            this.alertService.error(error);
          });
    }
  }
  cancelRate() {
    this.alertService.clear();
    if (this.user != null) {
      this.selectedrow = -1;
      this.showbtn = false;
      this.search(this.searchtext, this.category);
    }
  }
}

