import { Component, NgModule, OnInit } from '@angular/core';
import { AccountService, AlertService, ServiceProviderService } from '../../_services';
import { first } from 'rxjs/operators';
import { ServiceProvider, User } from 'src/app/_models';
import { stat } from 'fs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registered-list',
  templateUrl: './registered-list.component.html',
  styleUrls: ['./registered-list.component.scss']
})

export class RegisteredListComponent implements OnInit {

  splist: ServiceProvider[] = [];
  page = 1;
  pageSize = 10;
  user: User;
  status: string = '';
  isDataExists: boolean = false;
  NeedStatusColumn: boolean = false;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private serviceProv: ServiceProviderService,
    private acctService: AccountService,
    private alertService: AlertService) {
    this.acctService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.status = this.route.snapshot.queryParams['status'] || '';
    if (this.user != null && (this.user.role.toLowerCase() == "user" || (this.user.role.toLowerCase() == "bank admin" && this.status == '')))
      this.NeedStatusColumn = true;
    else
      this.NeedStatusColumn = false;
    this.getSPDataByStatus(this.status);
  }
  getSPDataByStatus(status: string) {
    this.serviceProv.getstatus(this.user.id, status)
      .pipe(first())
      .subscribe(
        data => {
          this.splist = <ServiceProvider[]>data;
          this.isDataExists = false;
          if (this.splist != null && this.splist.length > 0)
            this.isDataExists = true;
        },
        error => {
          this.alertService.error(error);
        });
  }
}




