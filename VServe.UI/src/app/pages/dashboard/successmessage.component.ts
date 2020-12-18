import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_services';

@Component({
  selector: 'app-successmessage',
  templateUrl: './successmessage.component.html'
})
export class SuccessMessageComponent {
  private message: string;
  public title: string;
  constructor(private route: ActivatedRoute,
    private alertService: AlertService,
    private cd: ChangeDetectorRef) {
  }
  ngAfterViewInit(): void {
    this.alertService.clear();
    this.message = this.route.snapshot.queryParams['message'] || '';
    this.title = this.route.snapshot.queryParams['title'] || '';
    if (this.message != "") {
      this.alertService.success(this.message, { keepAfterRouteChange: false });
      this.cd.detectChanges();
    }
  }
}
