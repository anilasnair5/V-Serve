import { Component } from '@angular/core';
/*import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';*/
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  public user: User;
  public IsUser:boolean=false;
  public IsAdmin:boolean=false;

  /*isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver) {}*/
  constructor(private accountService: AccountService) {
    this.accountService.user.subscribe(x => this.user = x);
    if(this.user!=null)
    {
      if(this.user.role.toLowerCase()=="user")
      {
      this.IsUser=true;
      this.IsAdmin=false;
      } 
      else if(this.user.role.toLowerCase()=="bank admin")
      {
      this.IsUser=false;
      this.IsAdmin=true;
      } 
    }
  }
  logout() {
    this.accountService.logout();
  }

}
