import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent,NavComponent,FooterComponent } from './_components';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { SideBarComponent } from './pages/side-bar/side-bar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/account/signup.component';
import { SigninComponent } from './pages/account/signin.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { SPRequestComponent } from './pages/serviceprovider/sprequest.component';
import { SuccessMessageComponent } from './pages/dashboard';
import { SpdetailsComponent } from './pages/serviceprovider/spdetails.component';
import { SearchComponent } from './pages/home/search.component';
import { ReviewComponent } from './pages/home/review.component';
import { RegisteredListComponent } from './pages/serviceprovider/registered-list.component';
import { SellerRequestComponent } from './pages/seller/sellerrequest.component';
import { JobPostComponent } from './pages/job/jobpost.component';


@NgModule({
  declarations: [
    AlertComponent,
    AppComponent,
    NavComponent,
    FooterComponent,
    NavBarComponent,
    SideBarComponent,
    DashboardComponent,
    HomeComponent,
    AdminHomeComponent,
    SignupComponent,
    SigninComponent,
    SPRequestComponent,
    SuccessMessageComponent,
    SpdetailsComponent,
    SearchComponent,
    ReviewComponent,
    RegisteredListComponent,
    SellerRequestComponent,
    JobPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
