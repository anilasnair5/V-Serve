import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models';
import { AccountService } from 'src/app/_services';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  IsUser: boolean = false;
  IsBankAdmin = false;
  user: User;

  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
    if (this.user.role.toLowerCase() == "bank admin") {
      this.IsBankAdmin = true;
      this.IsUser = false;
    }
    else if (this.user.role.toLowerCase() == "user") {
      this.IsBankAdmin = false;
      this.IsUser = true;
    }
  }

  ngOnInit(): void {
  }

}
