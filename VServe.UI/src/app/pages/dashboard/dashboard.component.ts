import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models';
import { AccountService } from 'src/app/_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: User;
  constructor(private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,) {
    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    if (this.user != null && this.user.role.toLowerCase() == "user")
      this.router.navigate(['/dashboard/inbox', { relativeTo: this.route }])

  }

}
