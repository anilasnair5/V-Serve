import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ServiceProvider,Feedback, SPRate,SpUpdateStatus } from '../_models';

@Injectable({ providedIn: 'root' })
export class ServiceProviderService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {

  }

  newRequest(formData: FormData) {

    /* const headers= new HttpHeaders()
     .set('Content-Type','multipart/form-data');*/
    return this.http.post(`${environment.apiUrl}/ServiceProvider/Register`, formData);
  }
  spdetailsgetById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/ServiceProvider/ServiceProviderDetails?serviceProviderId=` + id);
  }
  verificationById(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/ServiceProvider/MatchProfile?serviceProviderId=` + id);
  }
  updateStatusVerify(upstattusmodel: SpUpdateStatus) {
    return this.http.post(`${environment.apiUrl}/ServiceProvider/UpdateStatus`, upstattusmodel);
  }
  updateStatusReject(upstattusmodel: SpUpdateStatus) {
    return this.http.post(`${environment.apiUrl}/ServiceProvider/UpdateStatus`, upstattusmodel);
  }
  search(location: string, category: string) {
    return this.http.get(`${environment.apiUrl}/ServiceProvider/SearchServiceProviders?serviceLocation=` + location + "&&category=" + category);
  }
  setRate(ratemodel: SPRate) {
    return this.http.post(`${environment.apiUrl}/ServiceProvider/SubmitRate`, ratemodel);
  }
  getFeedbacks(id: string) {
    return this.http.get(`${environment.apiUrl}/ServiceProvider/ServiceProviderFeedbacks?serviceProviderId=` + id);
  }
  sendFeedback(feedmodel: Feedback) {
    return this.http.post(`${environment.apiUrl}/ServiceProvider/SubmitFeedback`, feedmodel);
  }
  getstatus(userId:string,status:string) {
    return this.http.get(`${environment.apiUrl}/ServiceProvider/ListServiceProviders?userId=`+userId+`&status=`+status);
  }
}


