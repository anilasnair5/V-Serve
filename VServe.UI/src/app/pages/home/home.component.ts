import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models';
import { AccountService } from 'src/app/_services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public searchtext: string;
    public category:string="Services";
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
    user: User;
    constructor(private router: Router,
        private route: ActivatedRoute,
        private acctService: AccountService) {
        this.acctService.user.subscribe(x => this.user = x);
    }

    ngOnInit(): void {
        if (this.user != null)
            this.router.navigate(['/dashboard'])

    }
    public gotoSearchPage(): void {
        this.router.navigate(['/search'], { queryParams: { searchtext: this.searchtext,category:this.category }});
    }

}
