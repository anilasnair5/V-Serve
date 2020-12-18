import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models';
import { AccountService } from 'src/app/_services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  user: User;
  searchtext: string;
  category:string="Services";
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

  constructor(private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,) {
    this.accountService.user.subscribe(x => this.user = x);
  }
  logout() {
    this.accountService.logout();
  }
  public gotoSearchPage(): void {
    this.router.navigate(['/search'], { queryParams: { searchtext: this.searchtext,category:this.category }});
  }
}
