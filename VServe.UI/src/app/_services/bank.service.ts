import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Bank } from '../_models/bank';

@Injectable({ providedIn: 'root' })
export class BankService {

  constructor(private router: Router,
    private http: HttpClient) {

    }
    getAllBanks() {
        return this.http.get(`${environment.apiUrl}/Bank/List`);
    }
    getRiskAssessmentQuestions():Observable<any> {
        return this.http.get(`${environment.apiUrl}/Bank/Questions`);
    }
}


