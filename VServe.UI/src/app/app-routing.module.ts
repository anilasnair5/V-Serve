import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';
import { SigninComponent } from './pages/account/signin.component';
import { SignupComponent } from './pages/account/signup.component';
import { DashboardComponent,SuccessMessageComponent } from './pages/dashboard';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/home/search.component';
import { SPRequestComponent } from './pages/serviceprovider/sprequest.component';
import { SpdetailsComponent } from './pages/serviceprovider/spdetails.component';
import { ReviewComponent } from './pages/home/review.component';
import { RegisteredListComponent } from './pages/serviceprovider/registered-list.component';
import { SellerRequestComponent } from './pages/seller/sellerrequest.component';
import { JobPostComponent } from './pages/job/jobpost.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"signin",
    component:SigninComponent
  },
  {
    path:"dashboard/newsprequest",
    component:SPRequestComponent,canActivate: [AuthGuard] 
  },
  {
    path:"dashboard/completed",
    component:SuccessMessageComponent,canActivate: [AuthGuard] 
  },
  {
    path:"dashboard/spdetails",
    component: SpdetailsComponent, canActivate: [AuthGuard]
  },
  {
    path:"search",
    component:SearchComponent
  },
  {
    path:"search/review",
    component:ReviewComponent
  },
  {
    path:"dashboard/inbox",
    component:RegisteredListComponent,canActivate:[AuthGuard]
  },
  {
    path:"dashboard/sellerrequest",
    component:SellerRequestComponent,canActivate:[AuthGuard]
  },
  {
    path:"dashboard/postjob",
    component:JobPostComponent,canActivate:[AuthGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
