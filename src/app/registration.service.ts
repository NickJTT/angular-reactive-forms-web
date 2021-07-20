import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private readonly url = 'http://127.0.0.1:5000/enroll';

  constructor(private readonly http: HttpClient) {}

  public register(data: any): Observable<any> {
    return this.http.post<any>(this.url, data);
  }
}
